'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { appendRecordedWorkflowRunActivity } from '../../lib/activity-store';
import { getProjectStore } from '../../lib/project-store';
import { createStoredWorkflow, recordManualWorkflowRun } from '../../lib/workflow-store';

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function readProjectSelections(formData: FormData) {
  return formData
    .getAll('projects')
    .filter((value): value is string => typeof value === 'string')
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function createWorkflowAction(formData: FormData) {
  const name = readField(formData, 'name');
  const templateId = readField(formData, 'template');
  const scheduleId = readField(formData, 'schedule');
  const selectedProjectSlugs = new Set(readProjectSelections(formData));

  if (!name || selectedProjectSlugs.size === 0) {
    redirect('/agents/new?status=missing-fields');
  }

  const projects = await getProjectStore().listProjects();
  const assignments = projects
    .filter((project) => selectedProjectSlugs.has(project.slug))
    .map((project) => ({
      projectName: project.name,
      projectSlug: project.slug,
    }));

  if (assignments.length === 0) {
    redirect('/agents/new?status=missing-fields');
  }

  const workflow = await createStoredWorkflow({
    name,
    templateId: templateId === 'build-project' || templateId === 'inspect-repo' ? templateId : 'run-tests',
    scheduleId: scheduleId === 'weekday-morning' ? 'weekday-morning' : 'manual-only',
    assignments,
  });

  revalidatePath('/agents');
  revalidatePath('/agents/new');
  revalidatePath('/projects');

  for (const assignment of workflow.assignments) {
    revalidatePath(`/projects/${assignment.projectSlug}`);
  }

  redirect('/agents?status=saved');
}

export async function recordManualWorkflowRunAction(formData: FormData) {
  const workflowId = readField(formData, 'workflowId');

  if (!workflowId) {
    redirect('/agents?status=run-unavailable');
  }

  const run = await recordManualWorkflowRun(workflowId);

  if (!run) {
    redirect('/agents?status=run-unavailable');
  }

  await appendRecordedWorkflowRunActivity({
    workflowName: run.workflowName,
    projectName: run.projectName,
    projectSlug: run.projectSlug,
    summary: run.summary,
  });

  revalidatePath('/agents');
  revalidatePath('/projects');
  revalidatePath(`/projects/${run.projectSlug}`);

  redirect('/agents?status=run-recorded');
}

'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { appendProjectCreatedActivities } from '../../lib/activity-store';
import { listHostHeartbeats } from '../../lib/host-store';
import { getProjectStore } from '../../lib/project-store';

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function createPlaceholderProjectAction(formData: FormData) {
  const name = readField(formData, 'name');
  const repo = readField(formData, 'repo');
  const repoSourceValue = readField(formData, 'repoSource');
  const hostValue = readField(formData, 'host');
  const repoSource = repoSourceValue === 'github-picker' ? 'github-picker' : 'manual';
  const hosts = await listHostHeartbeats();
  const selectedHost = hosts.find((host) => host.id === hostValue) ?? null;
  const fallbackHost = selectedHost ?? hosts[0] ?? null;

  if (!name || !repo) {
    const params = new URLSearchParams();

    if (name) {
      params.set('name', name);
    }

    if (repo) {
      params.set('repo', repo);
    }

    if (fallbackHost) {
      params.set('host', fallbackHost.id);
    }

    params.set('error', 'missing-fields');
    redirect(`/projects/new?${params.toString()}`);
  }

  if (!selectedHost) {
    const params = new URLSearchParams({ name, repo, error: 'invalid-host' });

    if (fallbackHost) {
      params.set('host', fallbackHost.id);
    }

    redirect(`/projects/new?${params.toString()}`);
  }

  const project = await getProjectStore().createPlaceholderProject({ name, repo, repoSource, host: selectedHost });
  await appendProjectCreatedActivities({
    hostLabel: project.host.label,
    projectName: project.name,
    projectSlug: project.slug,
    repo: project.repo,
    repoSource,
  });

  revalidatePath('/projects');
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath('/');

  redirect(`/projects/${project.slug}`);
}

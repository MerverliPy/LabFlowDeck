import { unstable_noStore as noStore } from 'next/cache';

import { listProjectActivityItems } from '../../lib/activity-store';
import { getHostHeartbeatByLabel } from '../../lib/host-store';
import { getProjectStore } from '../../lib/project-store';
import { getProjectWorkflowSnapshot } from '../../lib/workflow-store';

export type ProjectCardBadge = 'badgeBlue' | 'badgeGreen' | 'badgeAmber' | 'badgeRed';

export type ProjectOverview = {
  slug: string;
  name: string;
  repo: string;
  branch: string;
  summary: string;
  host: {
    label: string;
    state: string;
    badge: ProjectCardBadge;
    detail: string;
    heartbeat: string;
  };
  workflow: {
    label: string;
    state: string;
    badge: ProjectCardBadge;
    detail: string;
    cadence: string;
    lastRun: string;
  };
  lastRun: {
    label: string;
    value: string;
    badge: ProjectCardBadge;
  };
  deploy: {
    label: string;
    value: string;
    badge: ProjectCardBadge;
    target: string;
    updated: string;
  };
  repository: {
    provider: string;
    lastCommit: string;
    lastCommitAge: string;
    trackedPaths: string;
  };
  runtime: {
    state: string;
    badge: ProjectCardBadge;
    detail: string;
    session: string;
    commandProfile: string;
    outputPreview: string;
    actions: Array<{
      label: string;
      state: string;
      badge: ProjectCardBadge;
    }>;
  };
  metrics: Array<{
    label: string;
    value: string;
  }>;
  logs: {
    summary: string;
    items: Array<{
      title: string;
      source: string;
      severity: string;
      time: string;
      detail: string;
      badge: ProjectCardBadge;
    }>;
  };
  recentActivity: Array<{
    title: string;
    detail: string;
    time: string;
    badge: ProjectCardBadge;
  }>;
  stats: {
    summary: string;
    highlights: Array<{
      label: string;
      value: string;
    }>;
    rows: Array<{
      label: string;
      value: string;
    }>;
  };
};

const projectStore = getProjectStore();

function markProjectReadsDynamic() {
  if (process.env.NODE_ENV !== 'test') {
    noStore();
  }
}

async function applyStoredShellState(project: ProjectOverview) {
  const [storedHost, storedActivity, storedWorkflow] = await Promise.all([
    getHostHeartbeatByLabel(project.host.label),
    listProjectActivityItems(project.slug),
    getProjectWorkflowSnapshot(project.slug),
  ]);

  const mergedWorkflow = storedWorkflow?.workflow ?? project.workflow;
  const mergedLastRun = storedWorkflow?.lastRun ?? project.lastRun;

  return {
    ...project,
    host: {
      ...project.host,
      state: storedHost.state,
      badge: storedHost.badge,
      detail: storedHost.detail,
      heartbeat: storedHost.heartbeat,
    },
    metrics: project.metrics.map((metric) =>
      metric.label === 'Host latency'
        ? {
            ...metric,
            value: storedHost.latencyLabel,
          }
        : metric.label === 'Workflow'
          ? {
              ...metric,
              value: mergedWorkflow.label,
            }
        : metric
    ),
    workflow: mergedWorkflow,
    lastRun: mergedLastRun,
    logs: project.logs,
    recentActivity: storedActivity,
  };
}

export async function listProjects() {
  markProjectReadsDynamic();
  return Promise.all((await projectStore.listProjects()).map(applyStoredShellState));
}

export async function getProjectBySlug(slug: string) {
  markProjectReadsDynamic();
  const project = await projectStore.getProjectBySlug(slug);

  if (!project) {
    return null;
  }

  return applyStoredShellState(project);
}

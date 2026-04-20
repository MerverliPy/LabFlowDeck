import { unstable_noStore as noStore } from 'next/cache';

import { getProjectStore } from '../../lib/project-store';

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

export async function listProjects() {
  markProjectReadsDynamic();
  return projectStore.listProjects();
}

export async function getProjectBySlug(slug: string) {
  markProjectReadsDynamic();
  return projectStore.getProjectBySlug(slug);
}

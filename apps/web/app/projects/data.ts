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
  metrics: Array<{
    label: string;
    value: string;
  }>;
  recentActivity: Array<{
    title: string;
    detail: string;
    time: string;
    badge: ProjectCardBadge;
  }>;
};

export const projects: ProjectOverview[] = [
  {
    slug: 'labflowdeck',
    name: 'LabFlowDeck',
    repo: 'calvin/labflowdeck',
    branch: 'main',
    summary: 'Mobile-first control plane shell tracking the repo, host, workflow, and deploy posture in one glanceable view.',
    host: {
      label: 'Home server',
      state: 'healthy',
      badge: 'badgeGreen',
      detail: 'Ubuntu 24.04 · Docker healthy · 3 compose services tracked',
      heartbeat: 'Heartbeat 42s ago',
    },
    workflow: {
      label: 'Build + Validate',
      state: 'attached',
      badge: 'badgeBlue',
      detail: 'Manual-first workflow shell with test and build checkpoints ready for run monitoring later.',
      cadence: 'Manual with nightly reminder',
      lastRun: 'Passed 12m ago',
    },
    lastRun: {
      label: 'Last run',
      value: 'Passed 12m ago',
      badge: 'badgeGreen',
    },
    deploy: {
      label: 'Deploy',
      value: '3 services healthy',
      badge: 'badgeGreen',
      target: 'Preview + home server stack',
      updated: 'Status refreshed 4m ago',
    },
    repository: {
      provider: 'GitHub · default branch tracked',
      lastCommit: 'docs: ship project detail overview shell',
      lastCommitAge: 'Committed 27m ago',
      trackedPaths: 'app/, docs/, .opencode/',
    },
    metrics: [
      { label: 'Services', value: '3 healthy' },
      { label: 'Workflow', value: 'Ready to run' },
      { label: 'Host latency', value: '38 ms' },
      { label: 'Deploy target', value: 'Staging' },
    ],
    recentActivity: [
      {
        title: 'Deploy summary refreshed',
        detail: 'All tracked services remain healthy after the latest shell update.',
        time: '4m ago',
        badge: 'badgeGreen',
      },
      {
        title: 'Validation workflow passed',
        detail: 'The mock build + validate workflow finished without issues.',
        time: '12m ago',
        badge: 'badgeBlue',
      },
      {
        title: 'Repository synced',
        detail: 'Default branch metadata was refreshed for the overview shell.',
        time: '27m ago',
        badge: 'badgeBlue',
      },
    ],
  },
  {
    slug: 'promptshield',
    name: 'PromptShield',
    repo: 'calvin/promptshield',
    branch: 'release',
    summary: 'Release-focused project shell with an edge host that needs attention and a nightly inspection workflow.',
    host: {
      label: 'Edge host',
      state: 'degraded',
      badge: 'badgeAmber',
      detail: 'Tailscale edge box · Docker reachable · one container flagged unhealthy',
      heartbeat: 'Heartbeat 3m ago',
    },
    workflow: {
      label: 'Nightly inspect',
      state: 'scheduled',
      badge: 'badgeBlue',
      detail: 'Nightly validation stays attached so regressions surface before the next release push.',
      cadence: 'Nightly at 02:00',
      lastRun: 'Needs review 48m ago',
    },
    lastRun: {
      label: 'Last run',
      value: 'Needs review 48m ago',
      badge: 'badgeAmber',
    },
    deploy: {
      label: 'Deploy',
      value: '1 unhealthy container',
      badge: 'badgeRed',
      target: 'Edge preview stack',
      updated: 'Status refreshed 6m ago',
    },
    repository: {
      provider: 'GitHub · release branch tracked',
      lastCommit: 'fix: tighten prompt filtering fallback',
      lastCommitAge: 'Committed 53m ago',
      trackedPaths: 'src/, config/, docker-compose.yml',
    },
    metrics: [
      { label: 'Services', value: '2 tracked' },
      { label: 'Workflow', value: 'Nightly active' },
      { label: 'Host latency', value: '92 ms' },
      { label: 'Attention', value: '1 container' },
    ],
    recentActivity: [
      {
        title: 'Container flagged unhealthy',
        detail: 'The api worker needs review before the next release promotion.',
        time: '6m ago',
        badge: 'badgeRed',
      },
      {
        title: 'Nightly inspect completed',
        detail: 'Inspection captured warnings and left the run marked for review.',
        time: '48m ago',
        badge: 'badgeAmber',
      },
      {
        title: 'Release branch updated',
        detail: 'Repository metadata reflects the latest hardening change set.',
        time: '53m ago',
        badge: 'badgeBlue',
      },
    ],
  },
  {
    slug: 'signaldesk',
    name: 'SignalDesk',
    repo: 'calvin/signaldesk',
    branch: 'main',
    summary: 'Early-stage project shell with a healthy build host and room to attach its first reusable workflow.',
    host: {
      label: 'Build host',
      state: 'healthy',
      badge: 'badgeGreen',
      detail: 'Local build machine · Docker healthy · ready for first tracked service set',
      heartbeat: 'Heartbeat 1m ago',
    },
    workflow: {
      label: 'No workflow attached',
      state: 'optional',
      badge: 'badgeAmber',
      detail: 'This project can stay manual until a reusable workflow shell is worth attaching.',
      cadence: 'Manual only',
      lastRun: 'Not run yet',
    },
    lastRun: {
      label: 'Last run',
      value: 'Not run yet',
      badge: 'badgeAmber',
    },
    deploy: {
      label: 'Deploy',
      value: 'Ready for first target',
      badge: 'badgeBlue',
      target: 'No live target linked yet',
      updated: 'Shell updated today',
    },
    repository: {
      provider: 'GitHub · main branch tracked',
      lastCommit: 'feat: scaffold initial operator dashboard cards',
      lastCommitAge: 'Committed 2h ago',
      trackedPaths: 'app/, components/, README.md',
    },
    metrics: [
      { label: 'Services', value: '0 tracked' },
      { label: 'Workflow', value: 'Optional' },
      { label: 'Host latency', value: '24 ms' },
      { label: 'Next step', value: 'Attach workflow' },
    ],
    recentActivity: [
      {
        title: 'Project shell created',
        detail: 'The project is ready for a workflow attachment and first deploy target.',
        time: 'Today',
        badge: 'badgeBlue',
      },
      {
        title: 'Repository metadata captured',
        detail: 'Default branch and latest commit are visible for quick review.',
        time: '2h ago',
        badge: 'badgeBlue',
      },
      {
        title: 'Host remained healthy',
        detail: 'The build host continues reporting healthy Docker availability.',
        time: '2h ago',
        badge: 'badgeGreen',
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

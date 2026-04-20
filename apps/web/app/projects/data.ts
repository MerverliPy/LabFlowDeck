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
    runtime: {
      state: 'ready',
      badge: 'badgeBlue',
      detail: 'Structured runtime actions stay shell-only here: operators can preview the safe action set and expected output shape without opening a live terminal.',
      session: 'No live session attached',
      commandProfile: 'Start, stop, restart, rebuild, inspect, validate',
      outputPreview: 'Latest shell output preview: build validation finished cleanly and deploy restart remains confirmation-gated.',
      actions: [
        { label: 'Validate runtime', state: 'Suggested', badge: 'badgeBlue' },
        { label: 'Restart preview', state: 'Confirm first', badge: 'badgeAmber' },
        { label: 'Inspect services', state: 'Shell only', badge: 'badgeGreen' },
      ],
    },
    metrics: [
      { label: 'Services', value: '3 healthy' },
      { label: 'Workflow', value: 'Ready to run' },
      { label: 'Host latency', value: '38 ms' },
      { label: 'Deploy target', value: 'Staging' },
    ],
    logs: {
      summary: 'Bounded log summaries mirror recent workflow, deploy, and host events without streaming raw output.',
      items: [
        {
          title: 'Validation summary captured',
          source: 'workflow',
          severity: 'info',
          time: '12m ago',
          detail: 'The shell recorded a clean build + validate result with no follow-up action required.',
          badge: 'badgeBlue',
        },
        {
          title: 'Preview restart held for confirmation',
          source: 'runtime',
          severity: 'guarded',
          time: '22m ago',
          detail: 'Risky runtime actions remain gated and are presented only as shell previews in this phase.',
          badge: 'badgeAmber',
        },
        {
          title: 'Host heartbeat remained healthy',
          source: 'host',
          severity: 'ok',
          time: '42s ago',
          detail: 'Recent operator-visible logs show the host agent staying healthy after the last status refresh.',
          badge: 'badgeGreen',
        },
      ],
    },
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
    stats: {
      summary: 'Quick-glance shell metrics help compare operational posture without claiming persisted analytics.',
      highlights: [
        { label: 'Build time', value: '4m 18s' },
        { label: 'Success rate', value: '96%' },
        { label: 'CPU budget', value: '41%' },
        { label: 'Memory use', value: '1.8 GB' },
      ],
      rows: [
        { label: 'Last deploy window', value: 'Today · 09:10 UTC' },
        { label: 'Recent runtime checks', value: '6 shell summaries retained' },
        { label: 'Tracked services trend', value: 'Stable over last 24h' },
      ],
    },
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
    runtime: {
      state: 'attention needed',
      badge: 'badgeAmber',
      detail: 'The runtime shell emphasizes safe review first because one edge service is degraded and destructive actions remain intentionally non-live.',
      session: 'No interactive terminal in shell phase',
      commandProfile: 'Inspect, validate, restart, rebuild',
      outputPreview: 'Latest shell output preview: unhealthy worker flagged for operator review before any restart attempt.',
      actions: [
        { label: 'Inspect worker', state: 'Suggested', badge: 'badgeBlue' },
        { label: 'Restart api worker', state: 'Confirm first', badge: 'badgeAmber' },
        { label: 'Rebuild edge stack', state: 'Out of scope', badge: 'badgeRed' },
      ],
    },
    metrics: [
      { label: 'Services', value: '2 tracked' },
      { label: 'Workflow', value: 'Nightly active' },
      { label: 'Host latency', value: '92 ms' },
      { label: 'Attention', value: '1 container' },
    ],
    logs: {
      summary: 'The shell focuses on concise incident clues instead of raw container output or live tailing.',
      items: [
        {
          title: 'Worker health probe failed',
          source: 'deployment',
          severity: 'warning',
          time: '6m ago',
          detail: 'Recent shell logs note an unhealthy worker and point the operator to inspect before restarting.',
          badge: 'badgeRed',
        },
        {
          title: 'Nightly inspect requested review',
          source: 'workflow',
          severity: 'review',
          time: '48m ago',
          detail: 'The latest workflow summary surfaced warnings but did not attempt remediation in-app.',
          badge: 'badgeAmber',
        },
        {
          title: 'Edge heartbeat remained reachable',
          source: 'host',
          severity: 'ok',
          time: '3m ago',
          detail: 'Host transport remains visible in shell data even while one service needs attention.',
          badge: 'badgeBlue',
        },
      ],
    },
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
    stats: {
      summary: 'Compact shell metrics highlight degraded posture without implying retained analytics history.',
      highlights: [
        { label: 'Build time', value: '6m 02s' },
        { label: 'Success rate', value: '82%' },
        { label: 'CPU budget', value: '68%' },
        { label: 'Memory use', value: '2.4 GB' },
      ],
      rows: [
        { label: 'Last degraded alert', value: '6m ago' },
        { label: 'Review queue', value: '1 workflow + 1 service' },
        { label: 'Tracked services trend', value: '1 unhealthy / 2 total' },
      ],
    },
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
    runtime: {
      state: 'not configured',
      badge: 'badgeAmber',
      detail: 'The runtime shell stays intentionally light for this early-stage project and shows which safe actions would appear after the first tracked service is attached.',
      session: 'Awaiting first runtime target',
      commandProfile: 'Inspect, validate',
      outputPreview: 'Latest shell output preview: no runtime commands executed yet because deploy targets are still being confirmed.',
      actions: [
        { label: 'Validate setup', state: 'Suggested', badge: 'badgeBlue' },
        { label: 'Inspect compose files', state: 'Shell only', badge: 'badgeGreen' },
        { label: 'Restart service', state: 'Unavailable', badge: 'badgeAmber' },
      ],
    },
    metrics: [
      { label: 'Services', value: '0 tracked' },
      { label: 'Workflow', value: 'Optional' },
      { label: 'Host latency', value: '24 ms' },
      { label: 'Next step', value: 'Attach workflow' },
    ],
    logs: {
      summary: 'Placeholder logs describe what the project will surface once its first workflow and services are attached.',
      items: [
        {
          title: 'Project shell created',
          source: 'project',
          severity: 'info',
          time: 'Today',
          detail: 'The detail route keeps a bounded event trail even before runtime and deploy integrations exist.',
          badge: 'badgeBlue',
        },
        {
          title: 'Workflow attachment still optional',
          source: 'workflow',
          severity: 'note',
          time: '2h ago',
          detail: 'No live run output exists yet, so the shell focuses on setup guidance rather than empty terminal views.',
          badge: 'badgeAmber',
        },
        {
          title: 'Host remained healthy',
          source: 'host',
          severity: 'ok',
          time: '2h ago',
          detail: 'Host health stays visible even while deploy tracking is still being configured.',
          badge: 'badgeGreen',
        },
      ],
    },
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
    stats: {
      summary: 'Starter metrics help frame readiness for the first workflow and deployment target.',
      highlights: [
        { label: 'Build time', value: '—' },
        { label: 'Success rate', value: '—' },
        { label: 'CPU budget', value: '19%' },
        { label: 'Memory use', value: '0.8 GB' },
      ],
      rows: [
        { label: 'Last setup milestone', value: 'Project shell created today' },
        { label: 'Tracked runtime checks', value: '0 until first service attach' },
        { label: 'Next operational step', value: 'Attach workflow + deploy target' },
      ],
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

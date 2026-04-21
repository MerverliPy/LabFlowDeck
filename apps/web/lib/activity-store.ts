type ActivityBadge = 'badgeBlue' | 'badgeGreen' | 'badgeAmber' | 'badgeRed';

type ActivitySource = 'fixture-fallback' | 'project-create' | 'deploy-action';

interface StoredActivityEvent {
  id: string;
  title: string;
  detail: string;
  badge: ActivityBadge;
  createdAt: string;
  projectSlug?: string;
  projectName?: string;
  source: ActivitySource;
}

export interface HubActivityItem {
  title: string;
  meta: string;
  status: ActivityBadge;
  label: 'ok' | 'action' | 'warn' | 'alert';
}

export interface ProjectActivityItem {
  title: string;
  detail: string;
  time: string;
  badge: ActivityBadge;
}

interface ProjectCreatedActivityInput {
  hostLabel: string;
  projectName: string;
  projectSlug: string;
  repo: string;
  repoSource: 'github-picker' | 'manual';
}

interface DeployActivityInput {
  action: string;
  projectName: string;
  projectSlug: string;
  targetEnvironment?: string;
}

const MAX_STORED_ACTIVITY_EVENTS = 50;

function buildFixtureActivityEvents(): StoredActivityEvent[] {
  const now = Date.now();

  return [
    createStoredEvent({
      title: 'Deploy summary refreshed',
      detail: 'All tracked services remain healthy after the latest shell status refresh.',
      badge: 'badgeGreen',
      createdAt: new Date(now - 4 * 60_000).toISOString(),
      projectName: 'LabFlowDeck',
      projectSlug: 'labflowdeck',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Container flagged unhealthy',
      detail: 'The api worker needs review before the next release promotion.',
      badge: 'badgeRed',
      createdAt: new Date(now - 6 * 60_000).toISOString(),
      projectName: 'PromptShield',
      projectSlug: 'promptshield',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Validation workflow passed',
      detail: 'The bounded build + validate workflow finished without issues.',
      badge: 'badgeBlue',
      createdAt: new Date(now - 12 * 60_000).toISOString(),
      projectName: 'LabFlowDeck',
      projectSlug: 'labflowdeck',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Repository synced',
      detail: 'Default branch metadata was refreshed for the project overview shell.',
      badge: 'badgeBlue',
      createdAt: new Date(now - 27 * 60_000).toISOString(),
      projectName: 'LabFlowDeck',
      projectSlug: 'labflowdeck',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Nightly inspect completed',
      detail: 'Inspection captured warnings and left the run marked for review.',
      badge: 'badgeAmber',
      createdAt: new Date(now - 48 * 60_000).toISOString(),
      projectName: 'PromptShield',
      projectSlug: 'promptshield',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Release branch updated',
      detail: 'Repository metadata reflects the latest hardening change set.',
      badge: 'badgeBlue',
      createdAt: new Date(now - 53 * 60_000).toISOString(),
      projectName: 'PromptShield',
      projectSlug: 'promptshield',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Project shell created',
      detail: 'The project is ready for a workflow attachment and first deploy target.',
      badge: 'badgeBlue',
      createdAt: new Date(now - 2 * 60 * 60_000).toISOString(),
      projectName: 'SignalDesk',
      projectSlug: 'signaldesk',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Repository metadata captured',
      detail: 'Default branch and latest commit are visible for quick operator review.',
      badge: 'badgeBlue',
      createdAt: new Date(now - (2 * 60 * 60_000 + 60_000)).toISOString(),
      projectName: 'SignalDesk',
      projectSlug: 'signaldesk',
      source: 'fixture-fallback',
    }),
    createStoredEvent({
      title: 'Host remained healthy',
      detail: 'The build host continues reporting healthy Docker availability.',
      badge: 'badgeGreen',
      createdAt: new Date(now - (2 * 60 * 60_000 + 2 * 60_000)).toISOString(),
      projectName: 'SignalDesk',
      projectSlug: 'signaldesk',
      source: 'fixture-fallback',
    }),
  ];
}

function cloneEvents(events: StoredActivityEvent[]) {
  return structuredClone(events);
}

function createStoredEvent(input: Omit<StoredActivityEvent, 'id'>): StoredActivityEvent {
  return {
    id: crypto.randomUUID(),
    ...input,
  };
}

function sortEventsNewestFirst(events: StoredActivityEvent[]) {
  return events.sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
}

let storedActivityEvents: StoredActivityEvent[] | null = null;

function ensureStoredActivityEvents() {
  if (!storedActivityEvents) {
    storedActivityEvents = buildFixtureActivityEvents();
  }

  return storedActivityEvents;
}

function appendStoredEvents(events: StoredActivityEvent[]) {
  storedActivityEvents = sortEventsNewestFirst([...events, ...ensureStoredActivityEvents()]).slice(0, MAX_STORED_ACTIVITY_EVENTS);
  return cloneEvents(events);
}

function formatRelativeTime(isoTimestamp: string) {
  const timestamp = Date.parse(isoTimestamp);

  if (Number.isNaN(timestamp)) {
    return 'Recently';
  }

  const diffSeconds = Math.max(1, Math.round((Date.now() - timestamp) / 1000));

  if (diffSeconds < 60) {
    return `${diffSeconds}s ago`;
  }

  const diffMinutes = Math.round(diffSeconds / 60);

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function getHubLabel(badge: ActivityBadge): HubActivityItem['label'] {
  switch (badge) {
    case 'badgeGreen':
      return 'ok';
    case 'badgeBlue':
      return 'action';
    case 'badgeAmber':
      return 'warn';
    case 'badgeRed':
      return 'alert';
  }
}

export async function listHubActivityItems(limit = 3): Promise<HubActivityItem[]> {
  return cloneEvents(ensureStoredActivityEvents())
    .slice(0, limit)
    .map((event) => ({
      title: event.title,
      meta: `${event.projectName ?? 'Shell event'} · ${formatRelativeTime(event.createdAt)}`,
      status: event.badge,
      label: getHubLabel(event.badge),
    }));
}

export async function listProjectActivityItems(projectSlug: string, limit = 6): Promise<ProjectActivityItem[]> {
  return cloneEvents(ensureStoredActivityEvents())
    .filter((event) => event.projectSlug === projectSlug)
    .slice(0, limit)
    .map((event) => ({
      title: event.title,
      detail: event.detail,
      time: formatRelativeTime(event.createdAt),
      badge: event.badge,
    }));
}

export async function appendProjectCreatedActivities(input: ProjectCreatedActivityInput) {
  const createdAt = Date.now();

  return appendStoredEvents([
    createStoredEvent({
      title: 'Placeholder project saved',
      detail: `The guided create flow saved ${input.projectName} as a bounded project shell for ${input.repo}.`,
      badge: 'badgeBlue',
      createdAt: new Date(createdAt).toISOString(),
      projectName: input.projectName,
      projectSlug: input.projectSlug,
      source: 'project-create',
    }),
    createStoredEvent({
      title: input.repoSource === 'github-picker' ? 'Repository linked from GitHub picker' : 'Repository captured for project shell',
      detail:
        input.repoSource === 'github-picker'
          ? `${input.repo} was selected from the connected GitHub session without enabling file browsing or sync.`
          : `${input.repo} was saved as placeholder repository metadata for later setup steps.`,
      badge: 'badgeBlue',
      createdAt: new Date(createdAt - 1_000).toISOString(),
      projectName: input.projectName,
      projectSlug: input.projectSlug,
      source: 'project-create',
    }),
    createStoredEvent({
      title: 'Host selection captured',
      detail: `${input.hostLabel} remains the chosen runtime context until live host-backed creation is implemented.`,
      badge: 'badgeGreen',
      createdAt: new Date(createdAt - 2_000).toISOString(),
      projectName: input.projectName,
      projectSlug: input.projectSlug,
      source: 'project-create',
    }),
  ]);
}

export async function appendAcceptedDeployActivity(input: DeployActivityInput) {
  const targetEnvironment = input.targetEnvironment?.trim() || 'configured target';

  return appendStoredEvents([
    createStoredEvent({
      title: 'Deploy action accepted',
      detail: `${input.action} was accepted for ${input.projectName} on ${targetEnvironment}. The shell recorded the accepted request without claiming live Docker execution in-app.`,
      badge: 'badgeBlue',
      createdAt: new Date().toISOString(),
      projectName: input.projectName,
      projectSlug: input.projectSlug,
      source: 'deploy-action',
    }),
  ]);
}

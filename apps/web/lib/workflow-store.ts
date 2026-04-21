type WorkflowBadge = 'badgeBlue' | 'badgeGreen' | 'badgeAmber' | 'badgeRed';

type WorkflowTemplateId = 'run-tests' | 'build-project' | 'inspect-repo';

type WorkflowScheduleId = 'manual-only' | 'weekday-morning';

type WorkflowRecordSource = 'fixture-fallback' | 'workflow-save';

type WorkflowRunSource = 'fixture-fallback' | 'manual-placeholder';

interface WorkflowProjectAssignment {
  projectName: string;
  projectSlug: string;
}

interface StoredWorkflowRecord {
  id: string;
  name: string;
  templateId: WorkflowTemplateId;
  sourceLabel: string;
  scheduleId: WorkflowScheduleId;
  scheduleLabel: string;
  scheduleBadge: WorkflowBadge;
  assignments: WorkflowProjectAssignment[];
  createdAt: string;
  source: WorkflowRecordSource;
}

interface StoredWorkflowRun {
  id: string;
  workflowId: string;
  workflowName: string;
  projectName: string;
  projectSlug: string;
  duration: string;
  state: 'passed' | 'review' | 'manual' | 'recorded';
  badge: WorkflowBadge;
  summary: string;
  createdAt: string;
  source: WorkflowRunSource;
}

export interface WorkflowCardItem {
  id: string;
  name: string;
  source: string;
  schedule: {
    label: string;
    badge: WorkflowBadge;
  };
  lastRun: {
    label: string;
    badge: WorkflowBadge;
  };
  projects: string[];
  usage: string;
}

export interface WorkflowRunHistoryItem {
  workflow: string;
  project: string;
  finished: string;
  duration: string;
  badge: WorkflowBadge;
  state: StoredWorkflowRun['state'];
}

export interface ProjectWorkflowSnapshot {
  workflow: {
    label: string;
    state: string;
    badge: WorkflowBadge;
    detail: string;
    cadence: string;
    lastRun: string;
  };
  lastRun: {
    label: string;
    value: string;
    badge: WorkflowBadge;
  };
  logItem: {
    title: string;
    source: string;
    severity: string;
    time: string;
    detail: string;
    badge: WorkflowBadge;
  } | null;
}

interface CreateWorkflowInput {
  name: string;
  templateId: WorkflowTemplateId;
  scheduleId: WorkflowScheduleId;
  assignments: WorkflowProjectAssignment[];
}

const TEMPLATE_DEFINITIONS: Record<WorkflowTemplateId, { defaultName: string; sourceLabel: string }> = {
  'run-tests': {
    defaultName: 'Run Tests',
    sourceLabel: 'Template · Run Tests',
  },
  'build-project': {
    defaultName: 'Build Project',
    sourceLabel: 'Template · Build Project',
  },
  'inspect-repo': {
    defaultName: 'Inspect Repo',
    sourceLabel: 'Template · Inspect Repo',
  },
};

const SCHEDULE_DEFINITIONS: Record<WorkflowScheduleId, { label: string; badge: WorkflowBadge }> = {
  'manual-only': {
    label: 'Manual only',
    badge: 'badgeBlue',
  },
  'weekday-morning': {
    label: 'Weekdays · 08:30 UTC',
    badge: 'badgeGreen',
  },
};

function createWorkflowRecord(input: Omit<StoredWorkflowRecord, 'id'>): StoredWorkflowRecord {
  return {
    id: crypto.randomUUID(),
    ...input,
  };
}

function createWorkflowRun(input: Omit<StoredWorkflowRun, 'id'>): StoredWorkflowRun {
  return {
    id: crypto.randomUUID(),
    ...input,
  };
}

function buildFixtureWorkflowRecords(): StoredWorkflowRecord[] {
  const now = Date.now();

  return [
    createWorkflowRecord({
      name: 'Build + Validate',
      templateId: 'run-tests',
      sourceLabel: 'Template · Run Tests',
      scheduleId: 'weekday-morning',
      scheduleLabel: 'Weekdays · 08:30 UTC',
      scheduleBadge: 'badgeBlue',
      assignments: [
        { projectName: 'LabFlowDeck', projectSlug: 'labflowdeck' },
        { projectName: 'SignalDesk', projectSlug: 'signaldesk' },
      ],
      createdAt: new Date(now - 4 * 60 * 60_000).toISOString(),
      source: 'fixture-fallback',
    }),
    createWorkflowRecord({
      name: 'Deploy to Staging',
      templateId: 'build-project',
      sourceLabel: 'Template · Deploy to Staging',
      scheduleId: 'manual-only',
      scheduleLabel: 'Manual only',
      scheduleBadge: 'badgeAmber',
      assignments: [{ projectName: 'LabFlowDeck', projectSlug: 'labflowdeck' }],
      createdAt: new Date(now - 5 * 60 * 60_000).toISOString(),
      source: 'fixture-fallback',
    }),
    createWorkflowRecord({
      name: 'Nightly Repo Inspect',
      templateId: 'inspect-repo',
      sourceLabel: 'Template · Inspect Repository',
      scheduleId: 'weekday-morning',
      scheduleLabel: 'Nightly · 01:15 UTC',
      scheduleBadge: 'badgeBlue',
      assignments: [
        { projectName: 'PromptShield', projectSlug: 'promptshield' },
        { projectName: 'SignalDesk', projectSlug: 'signaldesk' },
      ],
      createdAt: new Date(now - 6 * 60 * 60_000).toISOString(),
      source: 'fixture-fallback',
    }),
  ];
}

function buildFixtureWorkflowRuns(records: StoredWorkflowRecord[]): StoredWorkflowRun[] {
  const buildValidate = records.find((record) => record.name === 'Build + Validate');
  const deployToStaging = records.find((record) => record.name === 'Deploy to Staging');
  const nightlyInspect = records.find((record) => record.name === 'Nightly Repo Inspect');
  const now = Date.now();

  return [
    createWorkflowRun({
      workflowId: buildValidate?.id ?? 'fixture-build-validate',
      workflowName: 'Build + Validate',
      projectName: 'LabFlowDeck',
      projectSlug: 'labflowdeck',
      duration: '4m 18s',
      state: 'passed',
      badge: 'badgeGreen',
      summary: 'The bounded build + validate workflow finished cleanly for LabFlowDeck.',
      createdAt: new Date(now - 12 * 60_000).toISOString(),
      source: 'fixture-fallback',
    }),
    createWorkflowRun({
      workflowId: nightlyInspect?.id ?? 'fixture-nightly-inspect',
      workflowName: 'Nightly Repo Inspect',
      projectName: 'PromptShield',
      projectSlug: 'promptshield',
      duration: '6m 02s',
      state: 'review',
      badge: 'badgeAmber',
      summary: 'The nightly inspect workflow recorded warnings for PromptShield and left the result marked for review.',
      createdAt: new Date(now - 48 * 60_000).toISOString(),
      source: 'fixture-fallback',
    }),
    createWorkflowRun({
      workflowId: deployToStaging?.id ?? 'fixture-deploy-to-staging',
      workflowName: 'Deploy to Staging',
      projectName: 'LabFlowDeck',
      projectSlug: 'labflowdeck',
      duration: '3m 11s',
      state: 'manual',
      badge: 'badgeBlue',
      summary: 'A manual deploy placeholder run was recorded for LabFlowDeck without executing background orchestration.',
      createdAt: new Date(now - 24 * 60 * 60_000).toISOString(),
      source: 'fixture-fallback',
    }),
  ];
}

function cloneRecords(records: StoredWorkflowRecord[]) {
  return structuredClone(records);
}

function cloneRuns(runs: StoredWorkflowRun[]) {
  return structuredClone(runs);
}

function sortRunsNewestFirst(runs: StoredWorkflowRun[]) {
  return runs.sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt));
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

function formatRunLabel(run: StoredWorkflowRun) {
  const relativeTime = formatRelativeTime(run.createdAt);

  switch (run.state) {
    case 'passed':
      return `Passed ${relativeTime}`;
    case 'review':
      return `Needs review ${relativeTime}`;
    case 'manual':
      return `Manual run ${relativeTime}`;
    case 'recorded':
      return `Recorded ${relativeTime}`;
  }
}

function getUsageLabel(count: number) {
  return `${count} project${count === 1 ? '' : 's'}`;
}

function getTemplateId(value: string): WorkflowTemplateId {
  return value === 'build-project' || value === 'inspect-repo' ? value : 'run-tests';
}

function getScheduleId(value: string): WorkflowScheduleId {
  return value === 'weekday-morning' ? value : 'manual-only';
}

let storedWorkflowRecords: StoredWorkflowRecord[] | null = null;
let storedWorkflowRuns: StoredWorkflowRun[] | null = null;

function ensureStoredWorkflowRecords() {
  if (!storedWorkflowRecords) {
    storedWorkflowRecords = buildFixtureWorkflowRecords();
  }

  return storedWorkflowRecords;
}

function ensureStoredWorkflowRuns() {
  if (!storedWorkflowRuns) {
    storedWorkflowRuns = buildFixtureWorkflowRuns(ensureStoredWorkflowRecords());
  }

  return storedWorkflowRuns;
}

export async function listWorkflowCards(): Promise<WorkflowCardItem[]> {
  const records = cloneRecords(ensureStoredWorkflowRecords());
  const runs = cloneRuns(ensureStoredWorkflowRuns());

  return records.map((record) => {
    const latestRun = runs.find((run) => run.workflowId === record.id);

    return {
      id: record.id,
      name: record.name,
      source: record.sourceLabel,
      schedule: {
        label: record.scheduleLabel,
        badge: record.scheduleBadge,
      },
      lastRun: latestRun
        ? {
            label: formatRunLabel(latestRun),
            badge: latestRun.badge,
          }
        : {
            label: record.scheduleId === 'manual-only' ? 'Ready to run' : 'Scheduled and ready',
            badge: record.scheduleId === 'manual-only' ? 'badgeBlue' : record.scheduleBadge,
          },
      projects: record.assignments.map((assignment) => assignment.projectName),
      usage: getUsageLabel(record.assignments.length),
    };
  });
}

export async function listWorkflowRunHistory(limit = 6): Promise<WorkflowRunHistoryItem[]> {
  return cloneRuns(ensureStoredWorkflowRuns())
    .slice(0, limit)
    .map((run) => ({
      workflow: run.workflowName,
      project: run.projectName,
      finished: formatRelativeTime(run.createdAt),
      duration: run.duration,
      badge: run.badge,
      state: run.state,
    }));
}

export async function createStoredWorkflow(input: CreateWorkflowInput) {
  const templateId = getTemplateId(input.templateId);
  const scheduleId = getScheduleId(input.scheduleId);
  const template = TEMPLATE_DEFINITIONS[templateId];
  const schedule = SCHEDULE_DEFINITIONS[scheduleId];
  const name = input.name.trim() || template.defaultName;

  const nextRecord = createWorkflowRecord({
    name,
    templateId,
    sourceLabel: template.sourceLabel,
    scheduleId,
    scheduleLabel: schedule.label,
    scheduleBadge: schedule.badge,
    assignments: input.assignments.map((assignment) => ({
      projectName: assignment.projectName,
      projectSlug: assignment.projectSlug,
    })),
    createdAt: new Date().toISOString(),
    source: 'workflow-save',
  });

  storedWorkflowRecords = [nextRecord, ...ensureStoredWorkflowRecords()];
  return structuredClone(nextRecord);
}

export async function recordManualWorkflowRun(workflowId: string) {
  const workflow = ensureStoredWorkflowRecords().find((record) => record.id === workflowId);
  const assignment = workflow?.assignments[0];

  if (!workflow || !assignment) {
    return null;
  }

  const nextRun = createWorkflowRun({
    workflowId: workflow.id,
    workflowName: workflow.name,
    projectName: assignment.projectName,
    projectSlug: assignment.projectSlug,
    duration: 'placeholder history',
    state: 'recorded',
    badge: 'badgeBlue',
    summary: `${workflow.name} recorded a bounded manual placeholder run for ${assignment.projectName}. The shell stored run history without executing background work or streaming step output.`,
    createdAt: new Date().toISOString(),
    source: 'manual-placeholder',
  });

  storedWorkflowRuns = sortRunsNewestFirst([nextRun, ...ensureStoredWorkflowRuns()]);
  return structuredClone(nextRun);
}

export async function getProjectWorkflowSnapshot(projectSlug: string): Promise<ProjectWorkflowSnapshot | null> {
  const workflow = ensureStoredWorkflowRecords().find((record) =>
    record.assignments.some((assignment) => assignment.projectSlug === projectSlug)
  );

  if (!workflow) {
    return null;
  }

  const matchingAssignment = workflow.assignments.find((assignment) => assignment.projectSlug === projectSlug);
  const latestRun = ensureStoredWorkflowRuns().find(
    (run) => run.workflowId === workflow.id && run.projectSlug === projectSlug
  );

  const workflowDetail = latestRun
    ? `Reusable workflow data now comes from the bounded server-owned workflow store. The latest manual placeholder run was recorded ${formatRelativeTime(latestRun.createdAt)} without claiming background execution.`
    : `Reusable workflow data now comes from the bounded server-owned workflow store. This project is attached to ${workflow.name}, but no manual placeholder run has been recorded yet.`;

  return {
    workflow: {
      label: workflow.name,
      state: 'attached',
      badge: latestRun?.badge ?? 'badgeBlue',
      detail: workflowDetail,
      cadence: workflow.scheduleLabel,
      lastRun: latestRun ? formatRunLabel(latestRun) : 'Ready to run',
    },
    lastRun: {
      label: 'Last run',
      value: latestRun ? formatRunLabel(latestRun) : 'Ready to run',
      badge: latestRun?.badge ?? 'badgeBlue',
    },
    logItem: latestRun
      ? {
          title: `${workflow.name} run recorded`,
          source: 'workflow',
          severity: latestRun.state === 'review' ? 'review' : 'info',
          time: formatRelativeTime(latestRun.createdAt),
          detail: latestRun.summary,
          badge: latestRun.badge,
        }
      : {
          title: `${workflow.name} attached`,
          source: 'workflow',
          severity: 'info',
          time: 'Just now',
          detail: `${matchingAssignment?.projectName ?? 'This project'} is attached to the bounded reusable workflow store and remains manual-first until a placeholder run is recorded.`,
          badge: 'badgeBlue',
        },
  };
}

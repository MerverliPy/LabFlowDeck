import type {
  DeployActionRequest,
  DeployActionResponse,
  DeployAdapterSource,
  DeployControlAdapter,
  DeploymentStatus,
  DeployStatusResponse,
} from '../app/deploy/types';

const DEFAULT_REFRESH_HINT_MS = 15_000;
const DEFAULT_TARGET_ENVIRONMENT = 'local-shell';
const FORWARDED_SAFE_ACTION: DeployActionRequest['action'] = 'deploy';

const FIXTURE_DEPLOYMENTS: DeploymentStatus[] = [
  {
    id: 'dep-labflowdeck',
    projectId: 'project-labflowdeck',
    projectName: 'LabFlowDeck',
    projectSlug: 'labflowdeck',
    repo: 'calvin/labflowdeck',
    hostName: 'Home server',
    hostStatus: 'online',
    runtimeStatus: 'deploying',
    healthStatus: 'warning',
    serviceCount: 3,
    healthyServiceCount: 2,
    resourceUsage: { cpuPct: 34, memoryMb: 1843 },
    updatedAt: '2026-04-19T15:32:00Z',
    services: [
      {
        id: 'svc-labflowdeck-web',
        name: 'web',
        runtimeStatus: 'active',
        healthStatus: 'healthy',
        resourceUsage: { cpuPct: 18, memoryMb: 420 },
        logPreview: 'Preview checks passing · 2m ago',
        lastUpdated: '2026-04-19T15:32:00Z',
        previewUrl: 'https://labflowdeck-preview.local',
        ports: [{ container: 3000, host: 3000, protocol: 'tcp' }],
      },
      {
        id: 'svc-labflowdeck-worker',
        name: 'worker',
        runtimeStatus: 'active',
        healthStatus: 'warning',
        resourceUsage: { cpuPct: 22, memoryMb: 610 },
        logPreview: 'Queue lag elevated on image-sync',
        lastUpdated: '2026-04-19T15:29:00Z',
      },
      {
        id: 'svc-labflowdeck-preview',
        name: 'preview',
        runtimeStatus: 'deploying',
        healthStatus: 'pending',
        resourceUsage: null,
        logPreview: 'Rolling out commit a91f2c1',
        lastUpdated: '2026-04-19T15:31:00Z',
        previewUrl: 'https://preview.labflowdeck.local',
        ports: [{ container: 3000, host: 3100, protocol: 'tcp' }],
      },
    ],
  },
  {
    id: 'dep-promptshield',
    projectId: 'project-promptshield',
    projectName: 'PromptShield',
    projectSlug: 'promptshield',
    repo: 'calvin/promptshield',
    hostName: 'Edge host',
    hostStatus: 'degraded',
    runtimeStatus: 'error',
    healthStatus: 'unhealthy',
    serviceCount: 2,
    healthyServiceCount: 0,
    resourceUsage: { cpuPct: 12, memoryMb: 760 },
    updatedAt: '2026-04-19T15:11:00Z',
    services: [
      {
        id: 'svc-promptshield-api',
        name: 'api',
        runtimeStatus: 'active',
        healthStatus: 'unhealthy',
        resourceUsage: { cpuPct: 14, memoryMb: 300 },
        logPreview: 'Health check timeout on /readyz',
        lastUpdated: '2026-04-19T15:11:00Z',
        ports: [{ container: 8080, host: 8080, protocol: 'tcp' }],
      },
      {
        id: 'svc-promptshield-sandbox',
        name: 'sandbox',
        runtimeStatus: 'stopped',
        healthStatus: 'unknown',
        resourceUsage: null,
        logPreview: 'Stopped after dependency patch',
        lastUpdated: '2026-04-19T14:46:00Z',
      },
    ],
  },
  {
    id: 'dep-signaldesk',
    projectId: 'project-signaldesk',
    projectName: 'SignalDesk',
    projectSlug: 'signaldesk',
    repo: 'calvin/signaldesk',
    hostName: 'Build host',
    hostStatus: 'online',
    runtimeStatus: 'active',
    healthStatus: 'healthy',
    serviceCount: 2,
    healthyServiceCount: 2,
    resourceUsage: { cpuPct: 28, memoryMb: 1126 },
    updatedAt: '2026-04-19T15:28:00Z',
    services: [
      {
        id: 'svc-signaldesk-dashboard',
        name: 'dashboard',
        runtimeStatus: 'active',
        healthStatus: 'healthy',
        resourceUsage: { cpuPct: 17, memoryMb: 390 },
        logPreview: 'Traffic stable · 9m ago',
        lastUpdated: '2026-04-19T15:28:00Z',
        previewUrl: 'https://signaldesk.local',
        ports: [{ container: 3000, host: 3200, protocol: 'tcp' }],
      },
      {
        id: 'svc-signaldesk-scheduler',
        name: 'scheduler',
        runtimeStatus: 'active',
        healthStatus: 'healthy',
        resourceUsage: { cpuPct: 9, memoryMb: 220 },
        logPreview: 'Last cron heartbeat 45s ago',
        lastUpdated: '2026-04-19T15:27:00Z',
      },
    ],
  },
];

function cloneDeployments(deployments: DeploymentStatus[]) {
  return structuredClone(deployments);
}

function deriveProjectSlug(projectId: string, projectName: string) {
  if (projectId.startsWith('project-')) {
    return projectId.slice('project-'.length);
  }

  return projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeDeployment(deployment: DeploymentStatus): DeploymentStatus {
  return {
    ...deployment,
    projectSlug: deployment.projectSlug?.trim() || deriveProjectSlug(deployment.projectId, deployment.projectName),
  };
}

function getTargetEnvironment() {
  return process.env.LABFLOWDECK_DEPLOY_ENVIRONMENT?.trim() || DEFAULT_TARGET_ENVIRONMENT;
}

function readConfiguredDeployments(): { deployments: DeploymentStatus[]; adapterSource: DeployAdapterSource } {
  const raw = process.env.LABFLOWDECK_DEPLOY_STATUS_JSON?.trim();

  if (!raw) {
    return {
      deployments: cloneDeployments(FIXTURE_DEPLOYMENTS).map(normalizeDeployment),
      adapterSource: 'fixture-fallback',
    };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (Array.isArray(parsed)) {
      return {
        deployments: cloneDeployments(parsed as DeploymentStatus[]).map(normalizeDeployment),
        adapterSource: 'configured-json',
      };
    }
  } catch {
    // Fall through to the fixture-backed adapter response so the shell remains usable.
  }

  return {
    deployments: cloneDeployments(FIXTURE_DEPLOYMENTS).map(normalizeDeployment),
    adapterSource: 'fixture-fallback',
  };
}

function buildRejectedResponse(
  message: string,
  targetEnvironment: string,
  adapterSource: DeployAdapterSource
): DeployActionResponse {
  return {
    accepted: false,
    status: 'rejected',
    operationId: crypto.randomUUID(),
    message,
    mode: 'adapter-control-plane',
    nextPollHintMs: 0,
    targetEnvironment,
    adapterSource,
  };
}

class ConfiguredSingleEnvironmentDeployAdapter implements DeployControlAdapter {
  async listStatuses(): Promise<DeployStatusResponse> {
    const { deployments, adapterSource } = readConfiguredDeployments();

    return {
      ok: true,
      mode: 'adapter-control-plane',
      generatedAt: new Date().toISOString(),
      refreshHintMs: DEFAULT_REFRESH_HINT_MS,
      targetEnvironment: getTargetEnvironment(),
      adapterSource,
      deployments,
    };
  }

  async executeAction(input: DeployActionRequest): Promise<DeployActionResponse> {
    const { deployments, adapterSource } = readConfiguredDeployments();
    const targetEnvironment = getTargetEnvironment();
    const deployment = deployments.find((item) => item.id === input.deploymentId);

    if (!deployment) {
      return buildRejectedResponse('Deployment target not found.', targetEnvironment, adapterSource);
    }

    if (input.targetType === 'service') {
      return buildRejectedResponse(
        'The configured deploy adapter only forwards deployment-level actions in this phase.',
        targetEnvironment,
        adapterSource
      );
    }

    if (input.action !== FORWARDED_SAFE_ACTION) {
      return buildRejectedResponse(
        `Only ${FORWARDED_SAFE_ACTION} is forwarded through the configured deploy adapter in this phase.`,
        targetEnvironment,
        adapterSource
      );
    }

    return {
      accepted: true,
      status: 'accepted',
      operationId: crypto.randomUUID(),
      message: `${input.action} forwarded for ${deployment.projectName} on ${targetEnvironment}. The adapter seam accepted the request without executing Docker control inside the web app.`,
      mode: 'adapter-control-plane',
      nextPollHintMs: DEFAULT_REFRESH_HINT_MS,
      targetEnvironment,
      adapterSource,
    };
  }
}

const deployControlAdapter = new ConfiguredSingleEnvironmentDeployAdapter();

export function getDeployControlAdapter() {
  return deployControlAdapter;
}

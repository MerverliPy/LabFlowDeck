import type {
  DeployActionRequest,
  DeployActionResponse,
  DeployControlAdapter,
  DeploymentStatus,
  DeployStatusResponse,
} from './types';

const BASE_DEPLOYMENTS: DeploymentStatus[] = [
  {
    id: 'dep-labflowdeck',
    projectId: 'project-labflowdeck',
    projectName: 'LabFlowDeck',
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

function cloneDeployments() {
  return structuredClone(BASE_DEPLOYMENTS);
}

class StaticDeployControlAdapter implements DeployControlAdapter {
  async listStatuses(): Promise<DeployStatusResponse> {
    return {
      ok: true,
      mode: 'control-plane-shell',
      generatedAt: new Date().toISOString(),
      refreshHintMs: 15000,
      deployments: cloneDeployments(),
    };
  }

  async executeAction(input: DeployActionRequest): Promise<DeployActionResponse> {
    const deployments = cloneDeployments();
    const deployment = deployments.find((item) => item.id === input.deploymentId);

    if (!deployment) {
      return {
        accepted: false,
        status: 'rejected',
        operationId: crypto.randomUUID(),
        message: 'Deployment target not found.',
        mode: 'simulated-control-plane',
        nextPollHintMs: 0,
      };
    }

    if (input.targetType === 'service') {
      const service = deployment.services.find((item) => item.id === input.serviceId);

      if (!service) {
        return {
          accepted: false,
          status: 'rejected',
          operationId: crypto.randomUUID(),
          message: 'Service target not found.',
          mode: 'simulated-control-plane',
          nextPollHintMs: 0,
        };
      }

      return {
        accepted: true,
        status: 'accepted',
        operationId: crypto.randomUUID(),
        message: `${input.action} requested for ${deployment.projectName} / ${service.name}. Thin adapter contract accepted the request without executing Docker control.`,
        mode: 'simulated-control-plane',
        nextPollHintMs: 15000,
      };
    }

    return {
      accepted: true,
      status: 'accepted',
      operationId: crypto.randomUUID(),
      message: `${input.action} requested for ${deployment.projectName}. Thin adapter contract accepted the request without executing Docker control.`,
      mode: 'simulated-control-plane',
      nextPollHintMs: 15000,
    };
  }
}

const deployControlAdapter = new StaticDeployControlAdapter();

export async function listDeployStatuses() {
  return deployControlAdapter.listStatuses();
}

export async function executeDeployAction(input: DeployActionRequest) {
  return deployControlAdapter.executeAction(input);
}

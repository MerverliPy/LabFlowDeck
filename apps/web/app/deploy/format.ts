import type {
  DeployAction,
  DeployFilterOption,
  DeploymentStatus,
  HealthStatus,
  HostStatus,
  RuntimeStatus,
} from './types';

export const STATUS_FILTERS: DeployFilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'unhealthy', label: 'Needs review' },
];

export function formatResourceUsage(cpuPct: number, memoryMb: number) {
  const formattedMemory = memoryMb >= 1024 ? `${(memoryMb / 1024).toFixed(1)} GB` : `${memoryMb} MB`;
  return `CPU ${cpuPct}% · RAM ${formattedMemory}`;
}

export function getRuntimeBadge(status: RuntimeStatus) {
  switch (status) {
    case 'active':
      return 'badgeGreen';
    case 'deploying':
    case 'restarting':
      return 'badgeBlue';
    case 'stopped':
      return 'badgeAmber';
    case 'error':
      return 'badgeRed';
  }
}

export function getHealthBadge(status: HealthStatus | HostStatus) {
  switch (status) {
    case 'healthy':
    case 'online':
      return 'badgeGreen';
    case 'warning':
    case 'pending':
    case 'unknown':
    case 'degraded':
      return 'badgeAmber';
    case 'unhealthy':
    case 'offline':
      return 'badgeRed';
  }
}

export function getProjectSummary(deployment: DeploymentStatus) {
  const attentionCount = deployment.services.filter(
    (service) => service.healthStatus === 'unhealthy' || service.healthStatus === 'warning' || service.runtimeStatus === 'deploying'
  ).length;

  if (attentionCount > 0) {
    return `${deployment.healthyServiceCount} healthy · ${attentionCount} attention`;
  }

  return `${deployment.healthyServiceCount} healthy`;
}

export function actionLabel(action: DeployAction) {
  switch (action) {
    case 'deploy':
      return 'Deploy';
    case 'rebuild':
      return 'Rebuild';
    case 'restart':
      return 'Restart';
    case 'stop':
      return 'Stop';
  }
}

export function formatUpdatedTime(value: string) {
  return new Date(value).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

import type { DeployFilterStatus, DeploymentStatus } from './types';

export function matchesStatusFilter(deployment: DeploymentStatus, statusFilter: DeployFilterStatus) {
  if (statusFilter === 'all') {
    return true;
  }

  if (statusFilter === 'active') {
    return deployment.runtimeStatus === 'active' || deployment.runtimeStatus === 'deploying' || deployment.runtimeStatus === 'restarting';
  }

  return (
    deployment.healthStatus === 'unhealthy' ||
    deployment.healthStatus === 'warning' ||
    deployment.hostStatus === 'offline' ||
    deployment.services.some(
      (service) => service.healthStatus === 'unhealthy' || service.healthStatus === 'warning' || service.runtimeStatus === 'error'
    )
  );
}

export function filterDeployments(
  deployments: DeploymentStatus[],
  projectFilter: string,
  statusFilter: DeployFilterStatus
) {
  return deployments.filter((deployment) => {
    const projectMatch = projectFilter === 'all' || deployment.projectId === projectFilter;
    return projectMatch && matchesStatusFilter(deployment, statusFilter);
  });
}

export function countTrackedServices(deployments: DeploymentStatus[]) {
  return deployments.reduce((count, deployment) => count + deployment.serviceCount, 0);
}

export function countAttentionServices(deployments: DeploymentStatus[]) {
  return deployments.reduce(
    (count, deployment) =>
      count +
      deployment.services.filter(
        (service) => service.healthStatus === 'warning' || service.healthStatus === 'unhealthy' || service.runtimeStatus === 'deploying'
      ).length,
    0
  );
}

export type DeployFilterStatus = 'all' | 'active' | 'unhealthy';

export type HostStatus = 'online' | 'degraded' | 'offline';

export type RuntimeStatus = 'active' | 'deploying' | 'stopped' | 'error' | 'restarting';

export type HealthStatus = 'healthy' | 'warning' | 'unhealthy' | 'unknown' | 'pending';

export type DeployAction = 'deploy' | 'rebuild' | 'restart' | 'stop';

export type DeployActionTargetType = 'deployment' | 'service';

export interface ResourceUsage {
  cpuPct: number;
  memoryMb: number;
}

export interface ServicePort {
  container: number;
  host: number;
  protocol: 'tcp' | 'udp';
}

export interface DeployServiceStatus {
  id: string;
  name: string;
  runtimeStatus: RuntimeStatus;
  healthStatus: HealthStatus;
  resourceUsage: ResourceUsage | null;
  logPreview: string;
  lastUpdated: string;
  previewUrl?: string;
  ports?: ServicePort[];
}

export interface DeploymentStatus {
  id: string;
  projectId: string;
  projectName: string;
  repo: string;
  hostName: string;
  hostStatus: HostStatus;
  runtimeStatus: RuntimeStatus;
  healthStatus: HealthStatus;
  serviceCount: number;
  healthyServiceCount: number;
  resourceUsage: ResourceUsage;
  updatedAt: string;
  services: DeployServiceStatus[];
}

export interface DeployStatusResponse {
  ok: true;
  mode: 'control-plane-shell';
  generatedAt: string;
  refreshHintMs: number;
  deployments: DeploymentStatus[];
}

export interface DeployActionRequest {
  action: DeployAction;
  deploymentId: string;
  targetType: DeployActionTargetType;
  serviceId?: string;
}

export interface DeployActionResponse {
  accepted: boolean;
  status: 'accepted' | 'rejected';
  operationId: string;
  message: string;
  mode: 'simulated-control-plane';
  nextPollHintMs: number;
}

export interface DeployControlAdapter {
  listStatuses(): Promise<DeployStatusResponse>;
  executeAction(input: DeployActionRequest): Promise<DeployActionResponse>;
}

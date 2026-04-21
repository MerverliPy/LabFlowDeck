export type DeployFilterStatus = 'all' | 'active' | 'unhealthy';

export interface DeployFilterOption {
  value: DeployFilterStatus;
  label: string;
}

export type HostStatus = 'online' | 'degraded' | 'offline';

export type RuntimeStatus = 'active' | 'deploying' | 'stopped' | 'error' | 'restarting';

export type HealthStatus = 'healthy' | 'warning' | 'unhealthy' | 'unknown' | 'pending';

export const DEPLOY_ACTION_VALUES = ['deploy', 'rebuild', 'restart', 'stop'] as const;

export type DeployAction = (typeof DEPLOY_ACTION_VALUES)[number];

export const DEPLOY_ACTION_TARGET_VALUES = ['deployment', 'service'] as const;

export type DeployActionTargetType = (typeof DEPLOY_ACTION_TARGET_VALUES)[number];

export type DeployStatusMode = 'control-plane-shell' | 'adapter-control-plane';

export type DeployActionMode = 'simulated-control-plane' | 'adapter-control-plane';

export type DeployAdapterSource = 'fixture-fallback' | 'configured-json';

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
  projectSlug?: string;
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
  mode: DeployStatusMode;
  generatedAt: string;
  refreshHintMs: number;
  targetEnvironment?: string;
  adapterSource?: DeployAdapterSource;
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
  mode: DeployActionMode;
  nextPollHintMs: number;
  targetEnvironment?: string;
  adapterSource?: DeployAdapterSource;
}

export interface DeployControlAdapter {
  listStatuses(): Promise<DeployStatusResponse>;
  executeAction(input: DeployActionRequest): Promise<DeployActionResponse>;
}

export interface DeployPageClientProps {
  initialData: DeployStatusResponse;
}

export interface PendingAction {
  action: DeployAction;
  targetType: DeployActionTargetType;
  deployment: DeploymentStatus;
  service?: DeployServiceStatus;
}

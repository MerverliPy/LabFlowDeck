type HostBadge = 'badgeBlue' | 'badgeGreen' | 'badgeAmber' | 'badgeRed';

type StoredHostState = 'healthy' | 'degraded' | 'offline';

type HostHeartbeatSource = 'fixture-fallback' | 'configured-json';

interface HostHeartbeatInput {
  id: string;
  label: string;
  detail: string;
  lastHeartbeatAt?: string | null;
  latencyMs?: number | null;
  status?: StoredHostState;
}

export interface StoredHostHeartbeat {
  id: string;
  label: string;
  detail: string;
  heartbeat: string;
  latencyLabel: string;
  state: StoredHostState;
  badge: HostBadge;
  lastHeartbeatAt: string | null;
}

export interface HostHeartbeatSummary {
  totalCount: number;
  connectedCount: number;
  healthyCount: number;
  degradedCount: number;
  offlineCount: number;
  alertCount: number;
  headline: string;
  detail: string;
  badge: HostBadge;
}

export interface HostHeartbeatResponse {
  ok: true;
  generatedAt: string;
  refreshHintMs: number;
  staleAfterSeconds: number;
  source: HostHeartbeatSource;
  summary: HostHeartbeatSummary;
  hosts: StoredHostHeartbeat[];
}

const DEFAULT_REFRESH_HINT_MS = 15_000;
const DEFAULT_STALE_AFTER_SECONDS = 60 * 5;

function getFixtureHosts(): HostHeartbeatInput[] {
  return [
    {
      id: 'home-server',
      label: 'Home server',
      detail: 'Ubuntu 24.04 · Docker healthy · bounded heartbeat source reporting normally.',
      lastHeartbeatAt: new Date(Date.now() - 45_000).toISOString(),
      latencyMs: 38,
      status: 'healthy',
    },
    {
      id: 'edge-host',
      label: 'Edge host',
      detail: 'Remote runner · latest bounded heartbeat is stale enough to require review before deploy actions.',
      lastHeartbeatAt: new Date(Date.now() - 11 * 60_000).toISOString(),
      latencyMs: 92,
      status: 'healthy',
    },
    {
      id: 'build-host',
      label: 'Build host',
      detail: 'Local build machine · awaiting a first bounded heartbeat from the shell source.',
      lastHeartbeatAt: null,
      latencyMs: null,
      status: 'healthy',
    },
  ];
}

function getStaleAfterSeconds() {
  const raw = process.env.LABFLOWDECK_HOST_HEARTBEAT_STALE_SECONDS?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_STALE_AFTER_SECONDS;
}

function normalizeHostId(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function cloneHostInputs(hosts: HostHeartbeatInput[]) {
  return structuredClone(hosts);
}

function parseConfiguredHosts(): { hosts: HostHeartbeatInput[]; source: HostHeartbeatSource } {
  const raw = process.env.LABFLOWDECK_HOST_HEARTBEAT_JSON?.trim();

  if (!raw) {
    return { hosts: cloneHostInputs(getFixtureHosts()), source: 'fixture-fallback' };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    const inputs = Array.isArray(parsed) ? parsed : [parsed];
    const hosts = inputs.filter(isHostHeartbeatInput);

    if (hosts.length > 0) {
      return { hosts: cloneHostInputs(hosts), source: 'configured-json' };
    }
  } catch {
    // Fall back to fixture-backed data so the shell remains honest and usable.
  }

  return { hosts: cloneHostInputs(getFixtureHosts()), source: 'fixture-fallback' };
}

function isHostHeartbeatInput(value: unknown): value is HostHeartbeatInput {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<HostHeartbeatInput>;

  return typeof candidate.id === 'string' && typeof candidate.label === 'string' && typeof candidate.detail === 'string';
}

function resolveHostState(host: HostHeartbeatInput, staleAfterMs: number) {
  if (!host.lastHeartbeatAt) {
    return 'offline' as const;
  }

  const timestamp = Date.parse(host.lastHeartbeatAt);

  if (Number.isNaN(timestamp)) {
    return 'degraded' as const;
  }

  const ageMs = Date.now() - timestamp;

  if (host.status === 'offline' || ageMs >= staleAfterMs * 3) {
    return 'offline' as const;
  }

  if (host.status === 'degraded' || ageMs >= staleAfterMs) {
    return 'degraded' as const;
  }

  return 'healthy' as const;
}

function getBadgeForState(state: StoredHostState): HostBadge {
  switch (state) {
    case 'healthy':
      return 'badgeGreen';
    case 'degraded':
      return 'badgeAmber';
    case 'offline':
      return 'badgeRed';
  }
}

function formatRelativeTime(isoTimestamp: string) {
  const timestamp = Date.parse(isoTimestamp);

  if (Number.isNaN(timestamp)) {
    return 'with invalid timestamp';
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

function formatHeartbeatLabel(host: HostHeartbeatInput, state: StoredHostState) {
  if (!host.lastHeartbeatAt) {
    return 'Awaiting first heartbeat';
  }

  const relative = formatRelativeTime(host.lastHeartbeatAt);

  if (state === 'healthy') {
    return `Heartbeat ${relative}`;
  }

  if (state === 'degraded') {
    return `Last heartbeat ${relative} · stale`;
  }

  return `Last heartbeat ${relative} · offline`;
}

function formatLatencyLabel(latencyMs?: number | null) {
  if (typeof latencyMs !== 'number' || !Number.isFinite(latencyMs) || latencyMs < 0) {
    return 'No latency sample';
  }

  return `${Math.round(latencyMs)} ms`;
}

function resolveStoredHostHeartbeat(host: HostHeartbeatInput, staleAfterMs: number): StoredHostHeartbeat {
  const state = resolveHostState(host, staleAfterMs);

  return {
    id: normalizeHostId(host.id),
    label: host.label.trim(),
    detail: host.detail.trim(),
    heartbeat: formatHeartbeatLabel(host, state),
    latencyLabel: formatLatencyLabel(host.latencyMs),
    state,
    badge: getBadgeForState(state),
    lastHeartbeatAt: host.lastHeartbeatAt?.trim() || null,
  };
}

function createMissingHostHeartbeat(label: string): StoredHostHeartbeat {
  return {
    id: normalizeHostId(label),
    label,
    detail: 'No bounded heartbeat record is stored for this host yet, so the shell treats it as offline instead of guessing.',
    heartbeat: 'Awaiting first heartbeat',
    latencyLabel: 'No latency sample',
    state: 'offline',
    badge: 'badgeRed',
    lastHeartbeatAt: null,
  };
}

export function summarizeHostHeartbeats(hosts: StoredHostHeartbeat[]): HostHeartbeatSummary {
  const healthyCount = hosts.filter((host) => host.state === 'healthy').length;
  const degradedCount = hosts.filter((host) => host.state === 'degraded').length;
  const offlineCount = hosts.filter((host) => host.state === 'offline').length;
  const connectedCount = hosts.length - offlineCount;
  const alertCount = degradedCount + offlineCount;

  const headline = alertCount > 0 ? 'Needs review' : 'Healthy';
  const badge = alertCount > 0 ? 'badgeAmber' : 'badgeGreen';
  const detailParts = [
    `${healthyCount} healthy`,
    `${degradedCount} degraded`,
    `${offlineCount} offline`,
  ];

  const mostRecentHealthyHost = hosts.find((host) => host.state === 'healthy');
  const trailingDetail = mostRecentHealthyHost
    ? `${mostRecentHealthyHost.label} ${mostRecentHealthyHost.heartbeat.toLowerCase()}`
    : 'No host is currently reporting a healthy heartbeat';

  return {
    totalCount: hosts.length,
    connectedCount,
    healthyCount,
    degradedCount,
    offlineCount,
    alertCount,
    headline,
    detail: `${detailParts.join(' · ')} · ${trailingDetail}`,
    badge,
  };
}

export async function listHostHeartbeats() {
  const staleAfterMs = getStaleAfterSeconds() * 1000;
  const { hosts } = parseConfiguredHosts();

  return hosts.map((host) => resolveStoredHostHeartbeat(host, staleAfterMs));
}

export async function getHostHeartbeatByLabel(label: string) {
  const hostLabel = label.trim().toLowerCase();
  const hosts = await listHostHeartbeats();

  return hosts.find((host) => host.label.trim().toLowerCase() === hostLabel) ?? createMissingHostHeartbeat(label.trim());
}

export async function getHostHeartbeatResponse(): Promise<HostHeartbeatResponse> {
  const staleAfterSeconds = getStaleAfterSeconds();
  const { source } = parseConfiguredHosts();
  const hosts = await listHostHeartbeats();

  return {
    ok: true,
    generatedAt: new Date().toISOString(),
    refreshHintMs: DEFAULT_REFRESH_HINT_MS,
    staleAfterSeconds,
    source,
    summary: summarizeHostHeartbeats(hosts),
    hosts,
  };
}

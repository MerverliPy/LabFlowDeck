'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type {
  DeployAction,
  DeployActionRequest,
  DeployActionResponse,
  DeployFilterStatus,
  DeploymentStatus,
  DeployServiceStatus,
  DeployStatusResponse,
  HealthStatus,
  HostStatus,
  RuntimeStatus,
} from './types';

interface DeployPageClientProps {
  initialData: DeployStatusResponse;
}

interface PendingAction {
  action: DeployAction;
  targetType: 'deployment' | 'service';
  deployment: DeploymentStatus;
  service?: DeployServiceStatus;
}

const STATUS_FILTERS: Array<{ value: DeployFilterStatus; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'unhealthy', label: 'Needs review' },
];

function formatResourceUsage(cpuPct: number, memoryMb: number) {
  const formattedMemory = memoryMb >= 1024 ? `${(memoryMb / 1024).toFixed(1)} GB` : `${memoryMb} MB`;
  return `CPU ${cpuPct}% · RAM ${formattedMemory}`;
}

function getRuntimeBadge(status: RuntimeStatus) {
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

function getHealthBadge(status: HealthStatus | HostStatus) {
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

function getProjectSummary(deployment: DeploymentStatus) {
  const attentionCount = deployment.services.filter(
    (service) => service.healthStatus === 'unhealthy' || service.healthStatus === 'warning' || service.runtimeStatus === 'deploying'
  ).length;

  if (attentionCount > 0) {
    return `${deployment.healthyServiceCount} healthy · ${attentionCount} attention`;
  }

  return `${deployment.healthyServiceCount} healthy`;
}

function matchesStatusFilter(deployment: DeploymentStatus, statusFilter: DeployFilterStatus) {
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

function actionLabel(action: DeployAction) {
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

export default function DeployPageClient({ initialData }: DeployPageClientProps) {
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);
  const [actionResponse, setActionResponse] = useState<DeployActionResponse | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectFilter = searchParams.get('project') ?? 'all';
  const statusFilter = (searchParams.get('status') as DeployFilterStatus | null) ?? 'all';

  const filteredDeployments = useMemo(() => {
    return data.deployments.filter((deployment) => {
      const projectMatch = projectFilter === 'all' || deployment.projectId === projectFilter;
      return projectMatch && matchesStatusFilter(deployment, statusFilter);
    });
  }, [data.deployments, projectFilter, statusFilter]);

  const trackedServices = data.deployments.reduce((count, deployment) => count + deployment.serviceCount, 0);
  const attentionServices = data.deployments.reduce(
    (count, deployment) =>
      count +
      deployment.services.filter(
        (service) => service.healthStatus === 'warning' || service.healthStatus === 'unhealthy' || service.runtimeStatus === 'deploying'
      ).length,
    0
  );

  const updateFilter = useCallback(
    (key: 'project' | 'status', value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const refreshStatuses = useCallback(async () => {
    setIsRefreshing(true);
    setActionError(null);

    try {
      const response = await fetch('/api/deploy/status', { cache: 'no-store' });

      if (!response.ok) {
        throw new Error('Unable to refresh deployment status.');
      }

      const nextData = (await response.json()) as DeployStatusResponse;
      setData(nextData);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Unable to refresh deployment status.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const submitAction = useCallback(async () => {
    if (!pendingAction) {
      return;
    }

    const payload: DeployActionRequest = {
      action: pendingAction.action,
      deploymentId: pendingAction.deployment.id,
      targetType: pendingAction.targetType,
      serviceId: pendingAction.service?.id,
    };

    setIsSubmittingAction(true);
    setActionError(null);
    setActionResponse(null);

    try {
      const response = await fetch('/api/deploy/actions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as DeployActionResponse;

      if (!response.ok || !result.accepted) {
        throw new Error(result.message || 'Deploy action was rejected.');
      }

      setActionResponse(result);
      setPendingAction(null);
      await refreshStatuses();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'Deploy action failed.');
    } finally {
      setIsSubmittingAction(false);
    }
  }, [pendingAction, refreshStatuses]);

  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Deploy</h1>
          <p className="subtle">
            Thin deploy status route, persisted filters, and confirmed action requests for a mobile-first control plane.
          </p>
        </div>
        <div className={`badge ${attentionServices > 0 ? 'badgeAmber' : 'badgeGreen'}`}>
          {attentionServices > 0 ? `${attentionServices} attention` : 'Stable'}
        </div>
      </section>

      <div className="grid">
        <section className="card deployOverviewCard">
          <div className="cardTitle">
            <h2>Deployment overview</h2>
            <span className="badge badgeBlue">{data.deployments.length} projects</span>
          </div>

          <div className="metricRow">
            <div className="metric">
              <div className="metricLabel">Tracked services</div>
              <div className="metricValue">{trackedServices} total</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Needs review</div>
              <div className="metricValue">{attentionServices} services</div>
            </div>
          </div>

          <div className="deployMetaRow subtle">
            <span>Updated {new Date(data.generatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            <button className="secondaryInlineButton" onClick={refreshStatuses} type="button">
              {isRefreshing ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </section>

        <section className="card deployControlCard">
          <div className="cardTitle">
            <h2>Deploy controls</h2>
            <span className="badge badgeBlue">Control-plane contract</span>
          </div>
          <p className="subtle deployControlCopy">
            Action requests are confirmed and posted through thin API routes. They intentionally stop at a bounded adapter seam instead of executing Docker control directly.
          </p>
          <div className="filterGroup">
            <div>
              <div className="metricLabel">Project filter</div>
              <div className="filterChips" aria-label="Project filter">
                <button
                  className={`filterChip${projectFilter === 'all' ? ' filterChipActive' : ''}`}
                  onClick={() => updateFilter('project', 'all')}
                  type="button"
                >
                  All
                </button>
                {data.deployments.map((deployment) => (
                  <button
                    className={`filterChip${projectFilter === deployment.projectId ? ' filterChipActive' : ''}`}
                    key={deployment.id}
                    onClick={() => updateFilter('project', deployment.projectId)}
                    type="button"
                  >
                    {deployment.projectName}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="metricLabel">Status filter</div>
              <div className="filterChips" aria-label="Status filter">
                {STATUS_FILTERS.map((filter) => (
                  <button
                    className={`filterChip${statusFilter === filter.value ? ' filterChipActive' : ''}`}
                    key={filter.value}
                    onClick={() => updateFilter('status', filter.value)}
                    type="button"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {actionResponse ? (
          <section className="card deployFeedbackCard deployFeedbackSuccess">
            <div className="cardTitle">
              <h2>Action accepted</h2>
              <span className="badge badgeGreen">{actionResponse.status}</span>
            </div>
            <p className="subtle deployControlCopy">{actionResponse.message}</p>
          </section>
        ) : null}

        {actionError ? (
          <section className="card deployFeedbackCard deployFeedbackError">
            <div className="cardTitle">
              <h2>Attention needed</h2>
              <span className="badge badgeRed">action error</span>
            </div>
            <p className="subtle deployControlCopy">{actionError}</p>
          </section>
        ) : null}

        <section className="deployStack" aria-label="Deployment cards">
          {filteredDeployments.length === 0 ? (
            <section className="card deployEmptyCard">
              <div className="cardTitle">
                <h2>No matching deployments</h2>
                <span className="badge badgeBlue">Filtered</span>
              </div>
              <p className="subtle deployControlCopy">
                Clear the project or status filter to see the full deployment control plane again.
              </p>
              <button className="secondaryCta" onClick={() => {
                updateFilter('project', 'all');
                updateFilter('status', 'all');
              }} type="button">
                Clear filters
              </button>
            </section>
          ) : null}

          {filteredDeployments.map((deployment) => (
            <article className="card deployProjectCard" key={deployment.id}>
              <div className="deployProjectHeader">
                <div>
                  <h2>{deployment.projectName}</h2>
                  <p className="projectRepo">{deployment.repo}</p>
                  <p className="listMeta">
                    {deployment.hostName} · {deployment.serviceCount} tracked services
                  </p>
                </div>
                <div className="deployBadgeGroup deployBadgeGroupCompact">
                  <span className={`badge ${getRuntimeBadge(deployment.runtimeStatus)}`}>runtime {deployment.runtimeStatus}</span>
                  <span className={`badge ${getHealthBadge(deployment.healthStatus)}`}>health {deployment.healthStatus}</span>
                </div>
              </div>

              <div className="deployProjectMeta">
                <div className="projectSignal">
                  <div className="projectSignalLabel">Resource summary</div>
                  <div className="projectSignalValue">
                    {formatResourceUsage(deployment.resourceUsage.cpuPct, deployment.resourceUsage.memoryMb)}
                  </div>
                </div>
                <div className="projectSignal">
                  <div className="projectSignalLabel">Project status</div>
                  <div className="projectSignalValue">{getProjectSummary(deployment)}</div>
                </div>
              </div>

              <div className="deployBadgeGroup">
                <span className={`badge ${getHealthBadge(deployment.hostStatus)}`}>host {deployment.hostStatus}</span>
                <span className="badge badgeBlue">updated {new Date(deployment.updatedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
              </div>

              <div className="actionRow">
                <button className="actionChip" onClick={() => setPendingAction({ action: 'deploy', targetType: 'deployment', deployment })} type="button">
                  Deploy stack
                </button>
                <button className="actionChip" onClick={() => setPendingAction({ action: 'rebuild', targetType: 'deployment', deployment })} type="button">
                  Rebuild stack
                </button>
              </div>

              <div className="serviceList" aria-label={`${deployment.projectName} services`}>
                {deployment.services.map((service) => (
                  <div className="serviceItem deployServiceItem" key={service.id}>
                    <div className="deployServiceBody">
                      <div>
                        <strong>{service.name}</strong>
                        <div className="listMeta">
                          {service.resourceUsage
                            ? formatResourceUsage(service.resourceUsage.cpuPct, service.resourceUsage.memoryMb)
                            : 'No live resource sample'}
                        </div>
                        {service.ports?.length ? (
                          <div className="listMeta">{service.ports.map((port) => `${port.host}:${port.container}/${port.protocol}`).join(' · ')}</div>
                        ) : null}
                        {service.previewUrl ? (
                          <div className="listMeta">Preview: {service.previewUrl}</div>
                        ) : null}
                      </div>
                      <p className="subtle deployServiceLog">{service.logPreview}</p>
                    </div>

                    <div className="deployBadgeGroup" aria-label={`${service.name} runtime and health`}>
                      <span className={`badge ${getRuntimeBadge(service.runtimeStatus)}`}>runtime {service.runtimeStatus}</span>
                      <span className={`badge ${getHealthBadge(service.healthStatus)}`}>health {service.healthStatus}</span>
                    </div>

                    <div className="actionRow actionRowCompact">
                      <button
                        className="actionChip"
                        onClick={() => setPendingAction({ action: 'restart', targetType: 'service', deployment, service })}
                        type="button"
                      >
                        Restart
                      </button>
                      <button
                        className="actionChip actionChipDanger"
                        onClick={() => setPendingAction({ action: 'stop', targetType: 'service', deployment, service })}
                        type="button"
                      >
                        Stop
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>

      {pendingAction ? (
        <div className="sheetOverlay" role="presentation">
          <section aria-modal="true" className="sheetCard" role="dialog">
            <div className="cardTitle">
              <h2>Confirm {actionLabel(pendingAction.action).toLowerCase()}</h2>
              <span className="badge badgeAmber">Confirm first</span>
            </div>
            <p className="subtle deployControlCopy">
              {pendingAction.targetType === 'deployment'
                ? `${actionLabel(pendingAction.action)} ${pendingAction.deployment.projectName} on ${pendingAction.deployment.hostName}?`
                : `${actionLabel(pendingAction.action)} ${pendingAction.service?.name} in ${pendingAction.deployment.projectName}?`}
            </p>
            <p className="subtle deployControlCopy">
              This control plane will post a thin action request to the deploy adapter boundary and return an accepted or rejected result.
            </p>
            <div className="flowActions">
              <button className="secondaryCta" onClick={() => setPendingAction(null)} type="button">
                Cancel
              </button>
              <button className="primaryCta" disabled={isSubmittingAction} onClick={submitAction} type="button">
                {isSubmittingAction ? 'Submitting…' : `${actionLabel(pendingAction.action)} now`}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink" href="/">
          Hub
        </Link>
        <Link className="navLink" href="/projects">
          Projects
        </Link>
        <Link className="navLink" href="/agents">
          Agents
        </Link>
        <Link className="navLink navLinkActive" href="/deploy">
          Deploy
        </Link>
      </nav>
    </main>
  );
}

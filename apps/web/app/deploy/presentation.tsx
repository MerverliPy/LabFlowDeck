import Link from 'next/link';

import {
  STATUS_FILTERS,
  actionLabel,
  formatPortBindings,
  formatResourceUsage,
  formatUpdatedTime,
  getHealthBadge,
  getProjectSummary,
  getRuntimeBadge,
} from './format';
import type {
  DeployActionResponse,
  DeployFilterStatus,
  DeployServiceStatus,
  DeploymentStatus,
  PendingAction,
} from './types';

interface DeployOverviewCardProps {
  deploymentCount: number;
  trackedServices: number;
  attentionServices: number;
  generatedAt: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function DeployOverviewCard({
  deploymentCount,
  trackedServices,
  attentionServices,
  generatedAt,
  isRefreshing,
  onRefresh,
}: DeployOverviewCardProps) {
  return (
    <section className="card deployOverviewCard">
      <div className="cardTitle">
        <h2>Deployment overview</h2>
        <span className="badge badgeBlue">{deploymentCount} projects</span>
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
        <span>Updated {formatUpdatedTime(generatedAt)}</span>
        <button className="secondaryInlineButton" onClick={onRefresh} type="button">
          {isRefreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </section>
  );
}

interface DeployControlCardProps {
  deployments: DeploymentStatus[];
  projectFilter: string;
  statusFilter: DeployFilterStatus;
  onFilterChange: (key: 'project' | 'status', value: string) => void;
}

export function DeployControlCard({ deployments, projectFilter, statusFilter, onFilterChange }: DeployControlCardProps) {
  return (
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
              onClick={() => onFilterChange('project', 'all')}
              type="button"
            >
              All
            </button>
            {deployments.map((deployment) => (
              <button
                className={`filterChip${projectFilter === deployment.projectId ? ' filterChipActive' : ''}`}
                key={deployment.id}
                onClick={() => onFilterChange('project', deployment.projectId)}
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
                onClick={() => onFilterChange('status', filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface DeployFeedbackCardProps {
  response?: DeployActionResponse | null;
  error?: string | null;
}

export function DeployFeedbackCard({ response, error }: DeployFeedbackCardProps) {
  if (response) {
    return (
      <section className="card deployFeedbackCard deployFeedbackSuccess">
        <div className="cardTitle">
          <h2>Action accepted</h2>
          <span className="badge badgeGreen">{response.status}</span>
        </div>
        <p className="subtle deployControlCopy">{response.message}</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card deployFeedbackCard deployFeedbackError">
        <div className="cardTitle">
          <h2>Attention needed</h2>
          <span className="badge badgeRed">action error</span>
        </div>
        <p className="subtle deployControlCopy">{error}</p>
      </section>
    );
  }

  return null;
}

interface DeployProjectListProps {
  deployments: DeploymentStatus[];
  onClearFilters: () => void;
  onOpenAction: (action: PendingAction) => void;
  onSelectService: (deployment: DeploymentStatus, service: DeployServiceStatus) => void;
}

export function DeployProjectList({ deployments, onClearFilters, onOpenAction, onSelectService }: DeployProjectListProps) {
  return (
    <section className="deployStack" aria-label="Deployment cards">
      {deployments.length === 0 ? (
        <section className="card deployEmptyCard">
          <div className="cardTitle">
            <h2>No matching deployments</h2>
            <span className="badge badgeBlue">Filtered</span>
          </div>
          <p className="subtle deployControlCopy">
            Clear the project or status filter to see the full deployment control plane again.
          </p>
          <button
            className="secondaryCta"
            onClick={onClearFilters}
            type="button"
          >
            Clear filters
          </button>
        </section>
      ) : null}

      {deployments.map((deployment) => (
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
            <span className="badge badgeBlue">updated {formatUpdatedTime(deployment.updatedAt)}</span>
          </div>

          <div className="actionRow">
            <button className="actionChip" onClick={() => onOpenAction({ action: 'deploy', targetType: 'deployment', deployment })} type="button">
              Deploy stack
            </button>
            <button className="actionChip" onClick={() => onOpenAction({ action: 'rebuild', targetType: 'deployment', deployment })} type="button">
              Rebuild stack
            </button>
          </div>

          <div className="serviceList" aria-label={`${deployment.projectName} services`}>
            {deployment.services.map((service) => (
              <button
                aria-label={`Open ${service.name} details`}
                className="serviceItem deployServiceButton deployServiceItem"
                key={service.id}
                onClick={() => onSelectService(deployment, service)}
                type="button"
              >
                <div className="deployServiceBody">
                  <div>
                    <strong>{service.name}</strong>
                    <div className="listMeta">
                      {service.resourceUsage
                        ? formatResourceUsage(service.resourceUsage.cpuPct, service.resourceUsage.memoryMb)
                        : 'No live resource sample'}
                    </div>
                    {formatPortBindings(service.ports) ? <div className="listMeta">{formatPortBindings(service.ports)}</div> : null}
                    {service.previewUrl ? <div className="listMeta">Preview: {service.previewUrl}</div> : null}
                  </div>
                  <p className="subtle deployServiceLog">{service.logPreview}</p>
                </div>

                <div className="deployBadgeGroup" aria-label={`${service.name} runtime and health`}>
                  <span className={`badge ${getRuntimeBadge(service.runtimeStatus)}`}>runtime {service.runtimeStatus}</span>
                  <span className={`badge ${getHealthBadge(service.healthStatus)}`}>health {service.healthStatus}</span>
                </div>

                <div className="deployServiceFooter">
                  <span className="badge badgeBlue">Tap for details</span>
                  <span className="listMeta">Updated {formatUpdatedTime(service.lastUpdated)}</span>
                </div>
              </button>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

interface DeployServiceDetailSheetProps {
  selectedService:
    | {
        deployment: DeploymentStatus;
        service: DeployServiceStatus;
      }
    | null;
  onClose: () => void;
  onOpenAction: (action: PendingAction) => void;
}

export function DeployServiceDetailSheet({ selectedService, onClose, onOpenAction }: DeployServiceDetailSheetProps) {
  if (!selectedService) {
    return null;
  }

  const { deployment, service } = selectedService;
  const portBindings = formatPortBindings(service.ports);

  return (
    <div className="sheetOverlay" onClick={onClose} role="presentation">
      <section
        aria-labelledby="deploy-service-sheet-title"
        aria-modal="true"
        className="sheetCard deployServiceSheet"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div aria-hidden="true" className="sheetHandle" />

        <div className="deployServiceSheetTop">
          <div className="cardTitle deployServiceSheetTitleRow">
            <div className="deployServiceSheetHeader">
              <h2 id="deploy-service-sheet-title">{service.name}</h2>
              <p className="projectRepo deployServiceSheetMeta">
                {deployment.projectName} · {deployment.hostName}
              </p>
            </div>
            <button className="secondaryInlineButton deployServiceSheetClose" onClick={onClose} type="button">
              Close
            </button>
          </div>

          <div className="deployBadgeGroup deployServiceSheetBadgeGroup">
            <span className={`badge ${getRuntimeBadge(service.runtimeStatus)}`}>runtime {service.runtimeStatus}</span>
            <span className={`badge ${getHealthBadge(service.healthStatus)}`}>health {service.healthStatus}</span>
            <span className={`badge ${getHealthBadge(deployment.hostStatus)}`}>host {deployment.hostStatus}</span>
          </div>

          <div className="deployProjectMeta deployServiceSheetSummary">
            <div className="projectSignal">
              <div className="projectSignalLabel">Resource usage</div>
              <div className="projectSignalValue">
                {service.resourceUsage
                  ? formatResourceUsage(service.resourceUsage.cpuPct, service.resourceUsage.memoryMb)
                  : 'No live resource sample'}
              </div>
            </div>
            <div className="projectSignal">
              <div className="projectSignalLabel">Last update</div>
              <div className="projectSignalValue">{formatUpdatedTime(service.lastUpdated)}</div>
            </div>
          </div>
        </div>

        <div className="deployServiceSheetBody">
          <section className="fieldShell deployServiceDetailSection">
            <div className="fieldLabel">Recent log preview</div>
            <div className="fieldValue deployServiceDetailLog">{service.logPreview}</div>
            <div className="listMeta">Thin control-plane preview only — full streaming logs stay out of scope.</div>
          </section>

          {service.previewUrl ? (
            <section className="fieldShell deployServiceDetailSection">
              <div className="fieldLabel">Preview URL</div>
              <div className="fieldValue deployServiceDetailWrap">{service.previewUrl}</div>
            </section>
          ) : null}

          {portBindings ? (
            <section className="fieldShell deployServiceDetailSection">
              <div className="fieldLabel">Ports</div>
              <div className="fieldValue deployServiceDetailWrap">{portBindings}</div>
            </section>
          ) : null}

          <section className="fieldShell deployServiceDetailSection">
            <div className="fieldLabel">Project context</div>
            <div className="fieldValue deployServiceDetailWrap">{deployment.repo}</div>
            <div className="listMeta">
              {getProjectSummary(deployment)} across {deployment.serviceCount} tracked services
            </div>
          </section>
        </div>

        <div className="deployServiceSheetFooter">
          <button className="secondaryCta deployServiceSheetBackButton" onClick={onClose} type="button">
            Back to services
          </button>
          <div className="deployServiceSheetActionGrid">
            <button
              className="actionChip deployServiceSheetActionButton"
              onClick={() => onOpenAction({ action: 'restart', targetType: 'service', deployment, service })}
              type="button"
            >
              Restart service
            </button>
            <button
              className="actionChip actionChipDanger deployServiceSheetActionButton"
              onClick={() => onOpenAction({ action: 'stop', targetType: 'service', deployment, service })}
              type="button"
            >
              Stop service
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ActionConfirmationSheetProps {
  pendingAction: PendingAction | null;
  isSubmittingAction: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ActionConfirmationSheet({
  pendingAction,
  isSubmittingAction,
  onCancel,
  onConfirm,
}: ActionConfirmationSheetProps) {
  if (!pendingAction) {
    return null;
  }

  const label = actionLabel(pendingAction.action);

  return (
    <div className="sheetOverlay" role="presentation">
      <section aria-modal="true" className="sheetCard" role="dialog">
        <div className="cardTitle">
          <h2>Confirm {label.toLowerCase()}</h2>
          <span className="badge badgeAmber">Confirm first</span>
        </div>
        <p className="subtle deployControlCopy">
          {pendingAction.targetType === 'deployment'
            ? `${label} ${pendingAction.deployment.projectName} on ${pendingAction.deployment.hostName}?`
            : `${label} ${pendingAction.service?.name} in ${pendingAction.deployment.projectName}?`}
        </p>
        <p className="subtle deployControlCopy">
          This control plane will post a thin action request to the deploy adapter boundary and return an accepted or rejected result.
        </p>
        <div className="flowActions">
          <button className="secondaryCta" onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="primaryCta" disabled={isSubmittingAction} onClick={onConfirm} type="button">
            {isSubmittingAction ? 'Submitting…' : `${label} now`}
          </button>
        </div>
      </section>
    </div>
  );
}

export function DeployBottomNav() {
  return (
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
  );
}

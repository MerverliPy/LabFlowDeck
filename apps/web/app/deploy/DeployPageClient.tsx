'use client';

import { useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type {
  DeployActionRequest,
  DeployActionResponse,
  DeployFilterStatus,
  DeployPageClientProps,
  DeployStatusResponse,
  PendingAction,
} from './types';
import { countAttentionServices, countTrackedServices, filterDeployments } from './filters';
import { ActionConfirmationSheet, DeployBottomNav, DeployControlCard, DeployFeedbackCard, DeployOverviewCard, DeployProjectList } from './presentation';

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

  const filteredDeployments = useMemo(
    () => filterDeployments(data.deployments, projectFilter, statusFilter),
    [data.deployments, projectFilter, statusFilter]
  );
  const trackedServices = useMemo(() => countTrackedServices(data.deployments), [data.deployments]);
  const attentionServices = useMemo(() => countAttentionServices(data.deployments), [data.deployments]);

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

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

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
        <DeployOverviewCard
          attentionServices={attentionServices}
          deploymentCount={data.deployments.length}
          generatedAt={data.generatedAt}
          isRefreshing={isRefreshing}
          onRefresh={refreshStatuses}
          trackedServices={trackedServices}
        />

        <DeployControlCard
          deployments={data.deployments}
          onFilterChange={updateFilter}
          projectFilter={projectFilter}
          statusFilter={statusFilter}
        />

        <DeployFeedbackCard error={actionError} response={actionResponse} />

        <DeployProjectList
          deployments={filteredDeployments}
          onClearFilters={clearFilters}
          onFilterChange={updateFilter}
          onOpenAction={setPendingAction}
        />
      </div>

      <ActionConfirmationSheet
        isSubmittingAction={isSubmittingAction}
        onCancel={() => setPendingAction(null)}
        onConfirm={submitAction}
        pendingAction={pendingAction}
      />

      <DeployBottomNav />
    </main>
  );
}

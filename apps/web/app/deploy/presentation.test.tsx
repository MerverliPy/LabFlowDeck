import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ActionConfirmationSheet, DeployProjectList, DeployServiceDetailSheet } from './presentation';
import type { DeploymentStatus, PendingAction } from './types';

const deployment: DeploymentStatus = {
  id: 'dep-labflowdeck',
  projectId: 'project-labflowdeck',
  projectName: 'LabFlowDeck',
  repo: 'calvin/labflowdeck',
  hostName: 'Home server',
  hostStatus: 'online',
  runtimeStatus: 'deploying',
  healthStatus: 'warning',
  serviceCount: 2,
  healthyServiceCount: 1,
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
      resourceUsage: null,
      logPreview: 'Queue lag elevated on image-sync',
      lastUpdated: '2026-04-19T15:29:00Z',
    },
  ],
};

describe('DeployProjectList', () => {
  it('opens service detail selection from a service row tap', () => {
    const onSelectService = vi.fn();

    render(
      <DeployProjectList
        deployments={[deployment]}
        onClearFilters={() => {}}
        onOpenAction={() => {}}
        onSelectService={onSelectService}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open web details' }));

    expect(onSelectService).toHaveBeenCalledWith(deployment, deployment.services[0]);
  });
});

describe('DeployServiceDetailSheet', () => {
  it('renders focused service details and routes service actions through the detail sheet', () => {
    const onOpenAction = vi.fn();

    render(
      <DeployServiceDetailSheet
        onClose={() => {}}
        onOpenAction={onOpenAction}
        selectedService={{ deployment, service: deployment.services[0] }}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('web')).toBeInTheDocument();
    expect(screen.getByText('https://labflowdeck-preview.local')).toBeInTheDocument();
    expect(screen.getByText('3000:3000/tcp')).toBeInTheDocument();
    expect(screen.getByText('Preview checks passing · 2m ago')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Restart service' }));

    expect(onOpenAction).toHaveBeenCalledWith({
      action: 'restart',
      targetType: 'service',
      deployment,
      service: deployment.services[0],
    });
  });
});

describe('ActionConfirmationSheet', () => {
  it('renders service confirmation copy and supports cancel/confirm handlers', () => {
    const onCancel = vi.fn();
    const onConfirm = vi.fn();
    const pendingAction: PendingAction = {
      action: 'stop',
      targetType: 'service',
      deployment,
      service: deployment.services[1],
    };

    render(
      <ActionConfirmationSheet
        isSubmittingAction={false}
        onCancel={onCancel}
        onConfirm={onConfirm}
        pendingAction={pendingAction}
      />
    );

    expect(screen.getByText('Confirm stop')).toBeInTheDocument();
    expect(screen.getByText('Stop worker in LabFlowDeck?')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    fireEvent.click(screen.getByRole('button', { name: 'Stop now' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});

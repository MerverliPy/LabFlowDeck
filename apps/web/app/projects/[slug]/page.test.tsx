import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ProjectDetailPage from './page';
import { appendRecordedWorkflowRunActivity } from '../../../lib/activity-store';
import { listWorkflowCards, recordManualWorkflowRun } from '../../../lib/workflow-store';

vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => {
    throw new Error('notFound');
  }),
}));

describe('ProjectDetailPage', () => {
  it('renders section jump links and shell-only runtime, logs, and stats content', async () => {
    const view = await ProjectDetailPage({
      params: Promise.resolve({ slug: 'labflowdeck' }),
    });

    render(view);

    const sectionNav = screen.getByLabelText('Project sections');

    expect(within(sectionNav).getByRole('link', { name: 'Repository' })).toHaveAttribute('href', '#repository');
    expect(within(sectionNav).getByRole('link', { name: 'Runtime' })).toHaveAttribute('href', '#runtime');
    expect(within(sectionNav).getByRole('link', { name: 'Workflow' })).toHaveAttribute('href', '#workflow');
    expect(within(sectionNav).getByRole('link', { name: 'Deployments' })).toHaveAttribute('href', '#deployments');
    expect(within(sectionNav).getByRole('link', { name: 'Logs' })).toHaveAttribute('href', '#logs');
    expect(within(sectionNav).getByRole('link', { name: 'Stats' })).toHaveAttribute('href', '#stats');

    expect(screen.getByRole('heading', { name: 'Runtime' })).toBeInTheDocument();
    expect(screen.getByText('No live session attached')).toBeInTheDocument();
    expect(screen.getByText(/Latest shell output preview:/)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Logs' })).toBeInTheDocument();
    expect(screen.getByText('Validation summary captured')).toBeInTheDocument();
    expect(within(screen.getByLabelText('Project logs')).getByText('workflow · info')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Stats' })).toBeInTheDocument();
    expect(screen.getByText('4m 18s')).toBeInTheDocument();
    expect(screen.getByText('Recent runtime checks')).toBeInTheDocument();

    expect(screen.getByText(/This project detail view is intentionally shell-only/)).toBeInTheDocument();
  });

  it('renders recorded workflow-run activity in recent activity without duplicating log metadata assertions', async () => {
    const [firstWorkflow] = await listWorkflowCards();
    const run = await recordManualWorkflowRun(firstWorkflow.id);

    expect(run).not.toBeNull();

    await appendRecordedWorkflowRunActivity({
      workflowName: run!.workflowName,
      projectName: run!.projectName,
      projectSlug: run!.projectSlug,
      summary: run!.summary,
    });

    const view = await ProjectDetailPage({
      params: Promise.resolve({ slug: run!.projectSlug }),
    });

    render(view);

    const recentActivity = screen.getByLabelText('Recent activity');

    expect(within(recentActivity).getByText(`${run!.workflowName} run recorded`)).toBeInTheDocument();
    expect(within(recentActivity).getByText(run!.summary)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.startsWith('Recorded '))
    ).toBeInTheDocument();
  });
});

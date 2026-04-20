import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import ProjectDetailPage from './page';

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
    expect(screen.getByText('workflow · info')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Stats' })).toBeInTheDocument();
    expect(screen.getByText('4m 18s')).toBeInTheDocument();
    expect(screen.getByText('Recent runtime checks')).toBeInTheDocument();

    expect(screen.getByText(/This project detail view is intentionally shell-only/)).toBeInTheDocument();
  });
});

import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

import { recordManualWorkflowRunAction } from './actions';
import { listWorkflowCards, listWorkflowRunHistory } from '../../lib/workflow-store';

const noticeContent = {
  saved: {
    title: 'Workflow saved',
    detail: 'The shell saved a bounded reusable workflow record and refreshed the Agents and Projects surfaces without claiming live execution.',
    badge: 'badgeGreen',
  },
  'run-recorded': {
    title: 'Manual placeholder run recorded',
    detail: 'A bounded manual run-history entry was stored for the workflow and its linked project without starting background work.',
    badge: 'badgeBlue',
  },
  'run-unavailable': {
    title: 'Workflow run could not be recorded',
    detail: 'The selected workflow was missing or had no linked project, so the shell stayed unchanged.',
    badge: 'badgeAmber',
  },
} as const;

type AgentsPageProps = {
  searchParams?: Promise<{
    status?: keyof typeof noticeContent;
  }>;
};

export default async function AgentsPage({ searchParams }: AgentsPageProps) {
  if (process.env.NODE_ENV !== 'test') {
    noStore();
  }

  const params = searchParams ? await searchParams : undefined;
  const workflows = await listWorkflowCards();
  const recentRuns = await listWorkflowRunHistory();
  const scheduledCount = workflows.filter((workflow) => workflow.schedule.label !== 'Manual only').length;
  const reviewCount = recentRuns.filter((run) => run.badge === 'badgeAmber' || run.badge === 'badgeRed').length;
  const notice = params?.status ? noticeContent[params.status] : null;

  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Agents</h1>
          <p className="subtle">Reusable workflow shells, bounded run history, and manual-first execution controls.</p>
        </div>
        <div className="badge badgeBlue">{workflows.length} workflows</div>
      </section>

      <div className="grid">
        {notice ? (
          <section className="card">
            <div className="cardTitle">
              <h2>{notice.title}</h2>
              <span className={`badge ${notice.badge}`}>Updated</span>
            </div>
            <p className="subtle">{notice.detail}</p>
          </section>
        ) : null}

        <section className="card projectSummaryCard">
          <div className="cardTitle">
            <h2>Workflow control plane</h2>
            <span className="subtle">Fast-glance status</span>
          </div>
          <div className="metricRow">
            <div className="metric">
              <div className="metricLabel">Scheduled</div>
              <div className="metricValue">{scheduledCount} active</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Recent health</div>
              <div className="metricValue">{reviewCount} needs review</div>
            </div>
          </div>
        </section>

        <section className="card createProjectCard">
          <div>
            <div className="cardTitle createProjectHeader">
              <h2>Create workflow</h2>
              <span className="badge badgeBlue">Next step</span>
            </div>
            <p className="subtle createProjectCopy">
              Start from a tested template, keep manual runs available, and attach the workflow to stored projects.
            </p>
          </div>
          <Link className="primaryCta ctaLink" href="/agents/new">
            Create workflow
          </Link>
        </section>

        <section className="agentsStack" aria-label="Workflow list">
          {workflows.map((workflow) => (
            <article className="card workflowCard" key={workflow.id}>
              <div className="workflowCardHeader">
                <div>
                  <h2>{workflow.name}</h2>
                  <p className="projectRepo">{workflow.source}</p>
                </div>
                <span className={`badge ${workflow.lastRun.badge}`}>{workflow.lastRun.label}</span>
              </div>

              <div className="workflowSignalGrid">
                <div className="projectSignal">
                  <div className="projectSignalLabel">Schedule</div>
                  <div className="projectSignalValue">{workflow.schedule.label}</div>
                </div>
                <div className="projectSignal">
                  <div className="projectSignalLabel">Projects using it</div>
                  <div className="projectSignalValue">{workflow.usage}</div>
                </div>
              </div>

              <div className="workflowProjects">
                {workflow.projects.map((project) => (
                  <span className="badge badgeBlue" key={project}>
                    {project}
                  </span>
                ))}
              </div>

              <div className="projectBadges">
                <span className={`badge ${workflow.schedule.badge}`}>schedule</span>
                <span className={`badge ${workflow.lastRun.badge}`}>last run</span>
              </div>

              <form action={recordManualWorkflowRunAction}>
                <input name="workflowId" type="hidden" value={workflow.id} />
                <button className="secondaryCta" type="submit">
                  Record manual run
                </button>
              </form>
            </article>
          ))}
        </section>

        <section className="card">
          <div className="cardTitle">
            <h2>Recent runs</h2>
            <span className="badge badgeBlue">Compact history</span>
          </div>
          <div className="list">
            {recentRuns.map((run) => (
              <div className="listItem agentsRunItem" key={`${run.workflow}-${run.project}-${run.finished}`}>
                <div>
                  <strong>{run.workflow}</strong>
                  <div className="listMeta">
                    {run.project} · {run.finished} · {run.duration}
                  </div>
                </div>
                <span className={`badge ${run.badge}`}>{run.state}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink" href="/">
          Hub
        </Link>
        <Link className="navLink" href="/projects">
          Projects
        </Link>
        <Link className="navLink navLinkActive" href="/agents">
          Agents
        </Link>
        <Link className="navLink" href="/deploy">
          Deploy
        </Link>
      </nav>
    </main>
  );
}

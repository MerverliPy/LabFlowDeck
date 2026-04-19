import Link from 'next/link';

const workflows = [
  {
    name: 'Build + Validate',
    source: 'Template · Run Tests',
    schedule: { label: 'Weekdays · 08:30 UTC', badge: 'badgeBlue' },
    lastRun: { label: 'Passed 12m ago', badge: 'badgeGreen' },
    projects: ['LabFlowDeck', 'SignalDesk'],
    usage: '2 projects',
  },
  {
    name: 'Deploy to Staging',
    source: 'Template · Deploy to Staging',
    schedule: { label: 'Manual only', badge: 'badgeAmber' },
    lastRun: { label: 'Ready to run', badge: 'badgeBlue' },
    projects: ['LabFlowDeck'],
    usage: '1 project',
  },
  {
    name: 'Nightly Repo Inspect',
    source: 'Template · Inspect Repository',
    schedule: { label: 'Nightly · 01:15 UTC', badge: 'badgeBlue' },
    lastRun: { label: 'Needs review 48m ago', badge: 'badgeAmber' },
    projects: ['PromptShield', 'SignalDesk'],
    usage: '2 projects',
  },
];

const recentRuns = [
  {
    workflow: 'Build + Validate',
    project: 'LabFlowDeck',
    finished: '12m ago',
    duration: '4m 18s',
    badge: 'badgeGreen',
    state: 'passed',
  },
  {
    workflow: 'Nightly Repo Inspect',
    project: 'PromptShield',
    finished: '48m ago',
    duration: '6m 02s',
    badge: 'badgeAmber',
    state: 'review',
  },
  {
    workflow: 'Deploy to Staging',
    project: 'LabFlowDeck',
    finished: 'Yesterday',
    duration: '3m 11s',
    badge: 'badgeBlue',
    state: 'manual',
  },
];

export default function AgentsPage() {
  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Agents</h1>
          <p className="subtle">Workflow templates, run history, and execution controls.</p>
        </div>
        <div className="badge badgeBlue">{workflows.length} workflows</div>
      </section>

      <div className="grid">
        <section className="card projectSummaryCard">
          <div className="cardTitle">
            <h2>Workflow control plane</h2>
            <span className="subtle">Fast-glance status</span>
          </div>
          <div className="metricRow">
            <div className="metric">
              <div className="metricLabel">Scheduled</div>
              <div className="metricValue">2 active</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Recent health</div>
              <div className="metricValue">1 needs review</div>
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
              Start from a tested template, keep manual runs available, and attach the workflow to projects later.
            </p>
          </div>
          <Link className="primaryCta ctaLink" href="/agents/new">Create workflow</Link>
        </section>

        <section className="agentsStack" aria-label="Workflow list">
          {workflows.map((workflow) => (
            <article className="card workflowCard" key={workflow.name}>
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
              <div className="listItem agentsRunItem" key={`${run.workflow}-${run.project}`}>
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
        <Link className="navLink" href="/">Hub</Link>
        <Link className="navLink" href="/projects">Projects</Link>
        <Link className="navLink navLinkActive" href="/agents">Agents</Link>
        <Link className="navLink" href="/deploy">Deploy</Link>
      </nav>
    </main>
  );
}

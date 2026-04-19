import Link from 'next/link';

const projects = [
  {
    name: 'LabFlowDeck',
    repo: 'calvin/labflowdeck',
    branch: 'main',
    host: { label: 'Home server', state: 'healthy', badge: 'badgeGreen' },
    workflow: { label: 'Build + Validate', state: 'attached', badge: 'badgeBlue' },
    lastRun: { label: 'Last run', value: 'Passed 12m ago', badge: 'badgeGreen' },
    deploy: { label: 'Deploy', value: '3 services healthy', badge: 'badgeGreen' },
  },
  {
    name: 'PromptShield',
    repo: 'calvin/promptshield',
    branch: 'release',
    host: { label: 'Edge host', state: 'degraded', badge: 'badgeAmber' },
    workflow: { label: 'Nightly inspect', state: 'scheduled', badge: 'badgeBlue' },
    lastRun: { label: 'Last run', value: 'Needs review 48m ago', badge: 'badgeAmber' },
    deploy: { label: 'Deploy', value: '1 unhealthy container', badge: 'badgeRed' },
  },
  {
    name: 'SignalDesk',
    repo: 'calvin/signaldesk',
    branch: 'main',
    host: { label: 'Build host', state: 'healthy', badge: 'badgeGreen' },
    workflow: { label: 'No workflow attached', state: 'optional', badge: 'badgeAmber' },
    lastRun: { label: 'Last run', value: 'Not run yet', badge: 'badgeAmber' },
    deploy: { label: 'Deploy', value: 'Ready for first target', badge: 'badgeBlue' },
  },
];

export default function ProjectsPage() {
  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Projects</h1>
          <p className="subtle">
            GitHub-linked project shells with fast-glance host, workflow, and deployment status.
          </p>
        </div>
        <div className="badge badgeBlue">{projects.length} tracked</div>
      </section>

      <div className="grid">
        <section className="card projectSummaryCard">
          <div className="cardTitle">
            <h2>Project control plane</h2>
            <span className="subtle">Thumb-first scan</span>
          </div>
          <div className="metricRow">
            <div className="metric">
              <div className="metricLabel">Healthy hosts</div>
              <div className="metricValue">2 / 3</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Workflow coverage</div>
              <div className="metricValue">2 attached</div>
            </div>
          </div>
        </section>

        <section className="card createProjectCard">
          <div>
            <div className="cardTitle createProjectHeader">
              <h2>Create a new project</h2>
              <span className="badge badgeBlue">Guided</span>
            </div>
            <p className="subtle createProjectCopy">
              Start with a repo, choose a paired host, confirm services, then attach a workflow later if needed.
            </p>
          </div>
          <Link className="primaryCta ctaLink" href="/projects/new">Create new project</Link>
        </section>

        <section className="projectsStack" aria-label="Project list">
          {projects.map((project) => (
            <article className="card projectCard" key={project.name}>
              <div className="projectCardHeader">
                <div>
                  <h2>{project.name}</h2>
                  <p className="projectRepo">{project.repo}</p>
                  <p className="listMeta">{project.branch} branch</p>
                </div>
                <span className={`badge ${project.host.badge}`}>{project.host.state}</span>
              </div>

              <div className="projectSignalGrid">
                <div className="projectSignal">
                  <div className="projectSignalLabel">Host status</div>
                  <div className="projectSignalValue">{project.host.label}</div>
                </div>
                <div className="projectSignal">
                  <div className="projectSignalLabel">Workflow</div>
                  <div className="projectSignalValue">{project.workflow.label}</div>
                </div>
                <div className="projectSignal">
                  <div className="projectSignalLabel">Last run</div>
                  <div className="projectSignalValue">{project.lastRun.value}</div>
                </div>
                <div className="projectSignal">
                  <div className="projectSignalLabel">Deployment</div>
                  <div className="projectSignalValue">{project.deploy.value}</div>
                </div>
              </div>

              <div className="projectBadges">
                <span className={`badge ${project.workflow.badge}`}>{project.workflow.state}</span>
                <span className={`badge ${project.lastRun.badge}`}>{project.lastRun.label}</span>
                <span className={`badge ${project.deploy.badge}`}>{project.deploy.label}</span>
              </div>
            </article>
          ))}
        </section>
      </div>

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink" href="/">Hub</Link>
        <Link className="navLink navLinkActive" href="/projects">Projects</Link>
        <Link className="navLink" href="/agents">Agents</Link>
        <Link className="navLink" href="/deploy">Deploy</Link>
      </nav>
    </main>
  );
}

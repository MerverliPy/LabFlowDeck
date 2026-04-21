import Link from 'next/link';
import { listProjects } from './data';

export default async function ProjectsPage() {
  const projects = await listProjects();
  const healthyHostCount = projects.filter((project) => project.host.state === 'healthy').length;
  const workflowCoverageCount = projects.filter((project) => project.workflow.state !== 'optional').length;

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
              <div className="metricValue">{healthyHostCount} / {projects.length}</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Workflow coverage</div>
              <div className="metricValue">{workflowCoverageCount} attached</div>
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
          {projects.length === 0 ? (
            <article className="card projectCard">
              <div className="projectCardHeader">
                <div>
                  <h2>No stored projects yet</h2>
                  <p className="projectRepo">Server-owned project store is empty</p>
                  <p className="listMeta">Use the guided flow to save a first placeholder project shell</p>
                </div>
                <span className="badge badgeAmber">Empty</span>
              </div>

              <p className="subtle projectCardCopy">
                The Projects list reflects the server-owned store, so it stays empty until you save a placeholder
                project from the guided creation flow.
              </p>

              <div className="projectBadges">
                <span className="badge badgeAmber">0 stored</span>
                <span className="badge badgeBlue">Guided setup available</span>
                <Link className="primaryCta ctaLink" href="/projects/new">
                  Start guided setup
                </Link>
              </div>
            </article>
          ) : (
            projects.map((project) => (
              <Link className="projectCardLink" href={`/projects/${project.slug}`} key={project.slug}>
                <article className="card projectCard">
                  <div className="projectCardHeader">
                    <div>
                      <h2>{project.name}</h2>
                      <p className="projectRepo">{project.repo}</p>
                      <p className="listMeta">{project.branch} branch</p>
                    </div>
                    <span className={`badge ${project.host.badge}`}>{project.host.state}</span>
                  </div>

                  <p className="subtle projectCardCopy">{project.summary}</p>

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
                    <span className="projectCardHint">Open overview</span>
                  </div>
                </article>
              </Link>
            ))
          )}
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

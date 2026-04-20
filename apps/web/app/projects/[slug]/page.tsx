import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProjectBySlug } from '../data';

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="shell">
      <section className="detailHeaderCard card">
        <div className="detailHeaderTopRow">
          <Link className="badge badgeBlue detailBackLink" href="/projects">
            Back to projects
          </Link>
          <span className={`badge ${project.host.badge}`}>{project.host.state}</span>
        </div>

        <div>
          <div className="eyebrow">Project overview</div>
          <h1>{project.name}</h1>
          <p className="projectRepo detailRepoMeta">
            {project.repo} · {project.branch}
          </p>
          <p className="subtle detailLeadCopy">{project.summary}</p>
        </div>

        <div className="projectSignalGrid">
          {project.metrics.map((metric) => (
            <div className="projectSignal" key={metric.label}>
              <div className="projectSignalLabel">{metric.label}</div>
              <div className="projectSignalValue">{metric.value}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid">
        <section className="card detailSectionCard">
          <div className="cardTitle">
            <h2>Repository</h2>
            <span className="badge badgeBlue">Shell data</span>
          </div>
          <div className="projectSignalGrid">
            <div className="projectSignal">
              <div className="projectSignalLabel">Provider</div>
              <div className="projectSignalValue">{project.repository.provider}</div>
            </div>
            <div className="projectSignal">
              <div className="projectSignalLabel">Last commit</div>
              <div className="projectSignalValue">{project.repository.lastCommit}</div>
            </div>
          </div>
          <div className="detailMetaList">
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Commit age</span>
              <span>{project.repository.lastCommitAge}</span>
            </div>
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Tracked paths</span>
              <span>{project.repository.trackedPaths}</span>
            </div>
          </div>
        </section>

        <section className="card detailSectionCard">
          <div className="cardTitle">
            <h2>Host</h2>
            <span className={`badge ${project.host.badge}`}>{project.host.label}</span>
          </div>
          <p className="subtle detailSectionCopy">{project.host.detail}</p>
          <div className="detailMetaList">
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Status</span>
              <span>{project.host.state}</span>
            </div>
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Heartbeat</span>
              <span>{project.host.heartbeat}</span>
            </div>
          </div>
        </section>

        <section className="card detailSectionCard">
          <div className="cardTitle">
            <h2>Workflow</h2>
            <span className={`badge ${project.workflow.badge}`}>{project.workflow.state}</span>
          </div>
          <p className="subtle detailSectionCopy">{project.workflow.detail}</p>
          <div className="detailMetaList">
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Workflow shell</span>
              <span>{project.workflow.label}</span>
            </div>
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Cadence</span>
              <span>{project.workflow.cadence}</span>
            </div>
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Last result</span>
              <span>{project.workflow.lastRun}</span>
            </div>
          </div>
        </section>

        <section className="card detailSectionCard">
          <div className="cardTitle">
            <h2>Deployment</h2>
            <span className={`badge ${project.deploy.badge}`}>{project.deploy.value}</span>
          </div>
          <div className="detailMetaList">
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Target</span>
              <span>{project.deploy.target}</span>
            </div>
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Summary</span>
              <span>{project.deploy.value}</span>
            </div>
            <div className="detailMetaRow">
              <span className="detailMetaLabel">Updated</span>
              <span>{project.deploy.updated}</span>
            </div>
          </div>
        </section>

        <section className="card detailSectionCard">
          <div className="cardTitle">
            <h2>Recent activity</h2>
            <span className="subtle">Latest shell events</span>
          </div>
          <div className="detailActivityList" aria-label="Recent activity">
            {project.recentActivity.map((item) => (
              <div className="detailActivityItem" key={`${item.time}-${item.title}`}>
                <div>
                  <div className="detailActivityHeader">
                    <h3>{item.title}</h3>
                    <span className={`badge ${item.badge}`}>{item.time}</span>
                  </div>
                  <p className="subtle detailActivityCopy">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card detailSectionCard">
          <div className="cardTitle">
            <h2>Scope boundary</h2>
            <span className="badge badgeAmber">No live integrations</span>
          </div>
          <p className="subtle detailSectionCopy">
            This overview is intentionally shell-only. Repository browsing, runtime controls, live workflow runs,
            and real deployment execution stay out of scope for this phase.
          </p>
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

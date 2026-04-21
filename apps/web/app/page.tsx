import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

import { listHubActivityItems } from '../lib/activity-store';
import { getHostHeartbeatResponse } from '../lib/host-store';

const quickActions = [
  {
    label: 'Run tests',
    detail: 'Open the Agents workflow shell to review or trigger the next validation run.',
    href: '/agents',
    badge: 'badgeBlue',
    state: 'Opens Agents',
  },
  {
    label: 'Restart deploy',
    detail: 'Open the Deploy route for confirmation-gated service actions and recent health status.',
    href: '/deploy',
    badge: 'badgeAmber',
    state: 'Review first',
  },
  {
    label: 'Inspect host',
    detail: 'Open Projects to inspect the current host and runtime shell summaries for each project.',
    href: '/projects',
    badge: 'badgeGreen',
    state: 'Opens Projects',
  },
] as const;

const workflows = [
  { name: 'Build + Validate', state: 'Running', badge: 'badgeBlue' },
  { name: 'Deploy Staging', state: 'Healthy', badge: 'badgeGreen' },
  { name: 'Nightly Repo Inspect', state: 'Needs review', badge: 'badgeAmber' },
];

function markHubDynamic() {
  if (process.env.NODE_ENV !== 'test') {
    noStore();
  }
}

export default async function HomePage() {
  markHubDynamic();
  const [hostHeartbeat, activity] = await Promise.all([getHostHeartbeatResponse(), listHubActivityItems()]);
  const hostSummary = hostHeartbeat.summary;

  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Hub</h1>
          <p className="subtle">
            Mobile-first command center for GitHub-linked projects, workflows, hosts, and deployments.
          </p>
        </div>
        <div className={`badge ${hostSummary.badge}`}>{hostSummary.headline}</div>
      </section>

      <div className="grid">
        <section className="card">
          <div className="cardTitle">
            <h2>System status</h2>
            <span className="badge badgeBlue">Control plane</span>
          </div>
          <div className="metricRow">
            <div className="metric">
              <div className="metricLabel">Active workflows</div>
              <div className="metricValue">3</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Connected hosts</div>
              <div className="metricValue">
                {hostSummary.connectedCount} / {hostSummary.totalCount}
              </div>
            </div>
            <div className="metric">
              <div className="metricLabel">Tracked services</div>
              <div className="metricValue">7</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Critical alerts</div>
              <div className="metricValue">{hostSummary.alertCount}</div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="cardTitle">
            <h2>Quick actions</h2>
            <span className="subtle">Honest shortcuts</span>
          </div>
          <div className="quickActions">
            {quickActions.map((action) => (
              <Link className="actionButton" href={action.href} key={action.label}>
                <div>
                  <div className="actionButtonLabel">{action.label}</div>
                  <div className="actionButtonHint">{action.detail}</div>
                </div>
                <span className={`badge ${action.badge}`}>{action.state}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="cardTitle">
            <h2>Workflow summary</h2>
            <span className="badge badgeBlue">Agents</span>
          </div>
          <div className="list">
            {workflows.map((workflow) => (
              <div className="listItem" key={workflow.name}>
                <div>
                  <strong>{workflow.name}</strong>
                  <div className="listMeta">GitHub Copilot-linked execution path</div>
                </div>
                <span className={`badge ${workflow.badge}`}>{workflow.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="cardTitle">
            <h2>Hosts + deploy</h2>
            <span className={`badge ${hostSummary.badge}`}>{hostSummary.alertCount} alert{hostSummary.alertCount === 1 ? '' : 's'}</span>
          </div>
          <div className="splitRow">
            <div className="metric">
              <div className="metricLabel">Host status</div>
              <div className="metricValue">
                {hostSummary.healthyCount} healthy · {hostSummary.degradedCount} degraded · {hostSummary.offlineCount} offline
              </div>
              <div className="subtle">{hostSummary.detail}</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Deployments</div>
              <div className="metricValue">6 / 7</div>
              <div className="subtle">Runtime healthy across tracked services</div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="cardTitle">
            <h2>Recent activity</h2>
            <span className="subtle">Execution + system events</span>
          </div>
          <div className="list">
            {activity.map((item) => (
              <div className="listItem" key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <div className="listMeta">{item.meta}</div>
                </div>
                <span className={`badge ${item.status}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink navLinkActive" href="/">Hub</Link>
        <Link className="navLink" href="/projects">Projects</Link>
        <Link className="navLink" href="/agents">Agents</Link>
        <Link className="navLink" href="/deploy">Deploy</Link>
      </nav>
    </main>
  );
}

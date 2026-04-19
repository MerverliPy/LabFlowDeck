import Link from 'next/link';

const workflows = [
  { name: 'Build + Validate', state: 'Running', badge: 'badgeBlue' },
  { name: 'Deploy Staging', state: 'Healthy', badge: 'badgeGreen' },
  { name: 'Nightly Repo Inspect', state: 'Needs review', badge: 'badgeAmber' },
];

const activity = [
  { title: 'Host paired successfully', meta: 'home-server · 2m ago', status: 'badgeGreen', label: 'ok' },
  { title: 'Preview deployment restarted', meta: 'labflowdeck-web · 18m ago', status: 'badgeBlue', label: 'action' },
  { title: 'Workflow validation warning', meta: 'Build + Validate · 37m ago', status: 'badgeAmber', label: 'warn' },
];

export default function HomePage() {
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
        <div className="badge badgeGreen">Healthy</div>
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
              <div className="metricValue">2</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Tracked services</div>
              <div className="metricValue">7</div>
            </div>
            <div className="metric">
              <div className="metricLabel">Critical alerts</div>
              <div className="metricValue">1</div>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="cardTitle">
            <h2>Quick actions</h2>
            <span className="subtle">Thumb-first</span>
          </div>
          <div className="quickActions">
            <button className="actionButton">Run tests</button>
            <button className="actionButton">Restart deploy</button>
            <button className="actionButton">Inspect host</button>
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
            <span className="badge badgeAmber">1 alert</span>
          </div>
          <div className="splitRow">
            <div className="metric">
              <div className="metricLabel">Host status</div>
              <div className="metricValue">1 healthy</div>
              <div className="subtle">1 degraded host needs review</div>
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

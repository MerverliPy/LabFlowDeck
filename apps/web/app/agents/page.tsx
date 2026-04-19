import Link from 'next/link';

export default function AgentsPage() {
  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Agents</h1>
          <p className="subtle">Workflow templates, run history, and execution controls.</p>
        </div>
        <div className="badge badgeBlue">3 workflows</div>
      </section>

      <div className="grid">
        <section className="card">
          <div className="cardTitle">
            <h2>Workflow library</h2>
            <span className="badge badgeGreen">Ready</span>
          </div>
          <div className="list">
            <div className="listItem">
              <div>
                <strong>Build workflow</strong>
                <div className="listMeta">Reusable template</div>
              </div>
              <span className="badge badgeBlue">active</span>
            </div>
            <div className="listItem">
              <div>
                <strong>Deploy workflow</strong>
                <div className="listMeta">Reusable template</div>
              </div>
              <span className="badge badgeGreen">ready</span>
            </div>
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

import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Projects</h1>
          <p className="subtle">GitHub-linked project shells, host bindings, and workflow attachment points.</p>
        </div>
        <div className="badge badgeBlue">2 active</div>
      </section>

      <div className="grid">
        <section className="card">
          <div className="cardTitle">
            <h2>Project list</h2>
            <span className="badge badgeGreen">Ready</span>
          </div>
          <div className="list">
            <div className="listItem">
              <div>
                <strong>LabFlowDeck</strong>
                <div className="listMeta">main · home-server · workflow attached</div>
              </div>
              <span className="badge badgeGreen">healthy</span>
            </div>
            <div className="listItem">
              <div>
                <strong>PromptShield</strong>
                <div className="listMeta">main · build host · no workflow attached</div>
              </div>
              <span className="badge badgeAmber">optional</span>
            </div>
          </div>
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

import Link from 'next/link';

export default function DeployPage() {
  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>Deploy</h1>
          <p className="subtle">Tracked services, runtime health, and deploy actions.</p>
        </div>
        <div className="badge badgeAmber">1 attention</div>
      </section>

      <div className="grid">
        <section className="card">
          <div className="cardTitle">
            <h2>Services</h2>
            <span className="badge badgeBlue">7 tracked</span>
          </div>
          <div className="list">
            <div className="listItem">
              <div>
                <strong>web</strong>
                <div className="listMeta">runtime running · health healthy</div>
              </div>
              <span className="badge badgeGreen">healthy</span>
            </div>
            <div className="listItem">
              <div>
                <strong>worker</strong>
                <div className="listMeta">runtime running · health warning</div>
              </div>
              <span className="badge badgeAmber">review</span>
            </div>
          </div>
        </section>
      </div>

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink" href="/">Hub</Link>
        <Link className="navLink" href="/projects">Projects</Link>
        <Link className="navLink" href="/agents">Agents</Link>
        <Link className="navLink navLinkActive" href="/deploy">Deploy</Link>
      </nav>
    </main>
  );
}

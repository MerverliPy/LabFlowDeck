import Link from 'next/link';

import { createPlaceholderProjectAction } from '../actions';

const steps = [
  {
    title: 'Name + repo',
    description: 'Capture the project label and the GitHub repository to manage.',
  },
  {
    title: 'Select host',
    description: 'Choose the paired machine that should own the runtime and deploy checks.',
  },
  {
    title: 'Confirm services',
    description: 'Review the detected Docker services before the first deploy summary appears.',
  },
  {
    title: 'Attach workflow',
    description: 'Optionally attach an agent workflow now, or leave it for later.',
  },
];

const hosts = [
  {
    id: 'home-server',
    name: 'Home server',
    detail: 'Ubuntu · Docker healthy · 3 compose projects',
    badge: 'badgeGreen',
    state: 'Recommended',
  },
  {
    id: 'edge-host',
    name: 'Edge host',
    detail: 'Remote runner · Last heartbeat 2m ago',
    badge: 'badgeBlue',
    state: 'Available',
  },
];

const services = [
  {
    name: 'web',
    detail: 'Port 3000 · healthcheck detected',
    badge: 'badgeGreen',
    state: 'Include',
  },
  {
    name: 'worker',
    detail: 'Background jobs · restart unless stopped',
    badge: 'badgeBlue',
    state: 'Include',
  },
  {
    name: 'redis',
    detail: 'Cache sidecar · internal only',
    badge: 'badgeAmber',
    state: 'Optional',
  },
];

const workflows = [
  {
    name: 'Build + Validate',
    detail: 'Runs install, test, and production build checks.',
    badge: 'badgeBlue',
    state: 'Suggested',
  },
  {
    name: 'Attach later',
    detail: 'Create the project first and add a reusable workflow after setup.',
    badge: 'badgeAmber',
    state: 'Optional',
  },
];

type NewProjectPageProps = {
  searchParams?: Promise<{
    error?: string;
    name?: string;
    repo?: string;
    host?: string;
  }>;
};

export default async function NewProjectPage({ searchParams }: NewProjectPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const selectedHostId = params?.host === 'edge-host' ? 'edge-host' : 'home-server';
  const initialName = params?.name?.trim() || 'Acme service desk';
  const initialRepo = params?.repo?.trim() || 'acme/service-desk';
  const showError = params?.error === 'missing-fields';

  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>New project</h1>
          <p className="subtle">
            A lightweight guided setup path for creating a project shell before live GitHub and host integration land.
          </p>
        </div>
        <Link className="badge badgeBlue" href="/projects">
          Back
        </Link>
      </section>

      <form action={createPlaceholderProjectAction} className="grid">
        <section className="card flowIntroCard">
          <div className="cardTitle">
            <h2>Create project flow</h2>
            <span className="subtle">4 thumb-first steps</span>
          </div>

          <div className="flowSteps" aria-label="Project creation steps">
            {steps.map((step, index) => (
              <div className="flowStepItem" key={step.title}>
                <div className="flowStepIndex">{index + 1}</div>
                <div className="flowStepBody">
                  <div className="flowStepTitle">{step.title}</div>
                  <p className="subtle flowStepCopy">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showError ? (
          <section className="card flowErrorCard">
            <div className="cardTitle">
              <h2>Project details missing</h2>
              <span className="badge badgeAmber">Check step 1</span>
            </div>
            <p className="subtle flowHint">
              Enter both a project name and a GitHub repository before saving a placeholder project shell.
            </p>
          </section>
        ) : null}

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 1 · Name + repo</h2>
            <span className="badge badgeBlue">Required</span>
          </div>

          <div className="inputStack">
            <label className="fieldShell fieldShellInteractive" htmlFor="project-name">
              <div className="fieldLabel">Project name</div>
              <input className="fieldInput" defaultValue={initialName} id="project-name" name="name" required type="text" />
            </label>
            <label className="fieldShell fieldShellInteractive" htmlFor="project-repo">
              <div className="fieldLabel">GitHub repository</div>
              <input className="fieldInput" defaultValue={initialRepo} id="project-repo" name="repo" required type="text" />
            </label>
          </div>

          <p className="subtle flowHint">
            Live repo browsing is not wired yet, so this phase saves the repository identifier you enter as bounded placeholder metadata.
          </p>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 2 · Select host</h2>
            <span className="badge badgeGreen">2 paired</span>
          </div>

          <div className="selectionStack">
            {hosts.map((host) => (
              <label className={`selectionCard selectionChoice${selectedHostId === host.id ? ' selectionCardActive' : ''}`} key={host.name}>
                <input className="selectionInput" defaultChecked={selectedHostId === host.id} name="host" type="radio" value={host.id} />
                <div className="selectionBody">
                  <div className="selectionTitle">{host.name}</div>
                  <p className="subtle selectionCopy">{host.detail}</p>
                </div>
                <span className={`badge ${host.badge}`}>{host.state}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 3 · Confirm services</h2>
            <span className="badge badgeBlue">Auto-detected</span>
          </div>

          <div className="serviceList">
            {services.map((service) => (
              <div className="serviceItem" key={service.name}>
                <div>
                  <div className="selectionTitle">{service.name}</div>
                  <p className="subtle selectionCopy">{service.detail}</p>
                </div>
                <span className={`badge ${service.badge}`}>{service.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 4 · Attach workflow</h2>
            <span className="badge badgeAmber">Optional</span>
          </div>

          <div className="selectionStack">
            {workflows.map((workflow, index) => (
              <div className={`selectionCard${index === 0 ? ' selectionCardActive' : ''}`} key={workflow.name}>
                <div className="selectionBody">
                  <div className="selectionTitle">{workflow.name}</div>
                  <p className="subtle selectionCopy">{workflow.detail}</p>
                </div>
                <span className={`badge ${workflow.badge}`}>{workflow.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card flowFooterCard">
          <div className="cardTitle">
            <h2>Ready to continue later</h2>
            <span className="badge badgeBlue">Save now</span>
          </div>
          <p className="subtle flowHint">
            This guided flow now saves a bounded placeholder project record for the single-user shell.
            Live repo lookup, host-backed creation, and service auto-detection stay out of scope for now.
          </p>
          <div className="flowActions">
            <Link className="secondaryCta ctaLink" href="/projects">
              Cancel for now
            </Link>
            <button className="primaryCta" type="submit">
              Create placeholder project
            </button>
          </div>
        </section>
      </form>

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink" href="/">
          Hub
        </Link>
        <Link className="navLink navLinkActive" href="/projects">
          Projects
        </Link>
        <Link className="navLink" href="/agents">
          Agents
        </Link>
        <Link className="navLink" href="/deploy">
          Deploy
        </Link>
      </nav>
    </main>
  );
}

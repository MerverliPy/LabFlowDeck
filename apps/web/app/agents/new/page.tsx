import Link from 'next/link';

const templates = [
  {
    name: 'Run Tests',
    detail: 'Installs dependencies, runs the default test suite, and summarizes failures.',
    badge: 'badgeBlue',
    state: 'Suggested',
  },
  {
    name: 'Build Project',
    detail: 'Runs a production build and captures the final artifact and warnings summary.',
    badge: 'badgeGreen',
    state: 'Ready',
  },
  {
    name: 'Inspect Repo',
    detail: 'Scans configs, docs, and recent diffs to prepare a focused review prompt.',
    badge: 'badgeAmber',
    state: 'Review',
  },
];

const steps = [
  {
    title: 'Choose template',
    description: 'Start from a reusable workflow template or branch into a scratch flow later.',
  },
  {
    title: 'Review steps',
    description: 'Confirm the ordered commands and tool usage that the workflow will run.',
  },
  {
    title: 'Set schedule',
    description: 'Keep the workflow manual-only or define a recurring execution window.',
  },
  {
    title: 'Assign projects',
    description: 'Attach the workflow to one or more projects after the shell is saved.',
  },
];

const workflowSteps = [
  {
    name: 'Install dependencies',
    detail: 'pnpm install with lockfile verification',
    badge: 'badgeBlue',
  },
  {
    name: 'Run tests',
    detail: 'pnpm test with failure summary capture',
    badge: 'badgeGreen',
  },
  {
    name: 'Build output',
    detail: 'pnpm build to validate shipping readiness',
    badge: 'badgeBlue',
  },
];

const schedules = [
  {
    name: 'Manual only',
    detail: 'Useful while the workflow is still being tuned.',
    badge: 'badgeBlue',
    state: 'Selected',
  },
  {
    name: 'Weekdays · 08:30 UTC',
    detail: 'Runs a morning health pass before deploy windows.',
    badge: 'badgeGreen',
    state: 'Available',
  },
];

const assignments = [
  {
    name: 'LabFlowDeck',
    detail: 'Primary web shell with active build checks',
    badge: 'badgeGreen',
    state: 'Attach first',
  },
  {
    name: 'PromptShield',
    detail: 'Use after template tuning and repo validation',
    badge: 'badgeAmber',
    state: 'Later',
  },
];

export default function NewWorkflowPage() {
  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>New workflow</h1>
          <p className="subtle">
            A lightweight guided shell for creating reusable agent workflows before live execution and persistence are wired.
          </p>
        </div>
        <Link className="badge badgeBlue" href="/agents">
          Back
        </Link>
      </section>

      <div className="grid">
        <section className="card flowIntroCard">
          <div className="cardTitle">
            <h2>Create workflow flow</h2>
            <span className="subtle">4 mobile steps</span>
          </div>

          <div className="flowSteps" aria-label="Workflow creation steps">
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

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 1 · Template gallery</h2>
            <span className="badge badgeBlue">Choose a base</span>
          </div>

          <div className="selectionStack">
            {templates.map((template, index) => (
              <div className={`selectionCard${index === 0 ? ' selectionCardActive' : ''}`} key={template.name}>
                <div className="selectionBody">
                  <div className="selectionTitle">{template.name}</div>
                  <p className="subtle selectionCopy">{template.detail}</p>
                </div>
                <span className={`badge ${template.badge}`}>{template.state}</span>
              </div>
            ))}
          </div>

          <p className="subtle flowHint">
            This placeholder gallery mirrors the `SPEC.md` template-first path without introducing editor or provider wiring yet.
          </p>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 2 · Review workflow steps</h2>
            <span className="badge badgeGreen">Pre-populated</span>
          </div>

          <div className="serviceList">
            {workflowSteps.map((step) => (
              <div className="serviceItem" key={step.name}>
                <div>
                  <div className="selectionTitle">{step.name}</div>
                  <p className="subtle selectionCopy">{step.detail}</p>
                </div>
                <span className={`badge ${step.badge}`}>step</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 3 · Schedule</h2>
            <span className="badge badgeAmber">Optional</span>
          </div>

          <div className="selectionStack">
            {schedules.map((schedule, index) => (
              <div className={`selectionCard${index === 0 ? ' selectionCardActive' : ''}`} key={schedule.name}>
                <div className="selectionBody">
                  <div className="selectionTitle">{schedule.name}</div>
                  <p className="subtle selectionCopy">{schedule.detail}</p>
                </div>
                <span className={`badge ${schedule.badge}`}>{schedule.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 4 · Assign projects</h2>
            <span className="badge badgeBlue">Reusable</span>
          </div>

          <div className="selectionStack">
            {assignments.map((assignment, index) => (
              <div className={`selectionCard${index === 0 ? ' selectionCardActive' : ''}`} key={assignment.name}>
                <div className="selectionBody">
                  <div className="selectionTitle">{assignment.name}</div>
                  <p className="subtle selectionCopy">{assignment.detail}</p>
                </div>
                <span className={`badge ${assignment.badge}`}>{assignment.state}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card flowFooterCard">
          <div className="cardTitle">
            <h2>Ready for the next implementation phase</h2>
            <span className="badge badgeBlue">Placeholder</span>
          </div>
          <p className="subtle flowHint">
            This route completes the missing CTA destination and shows the intended workflow-creation path. Real saving, editing, scheduling, and run execution remain intentionally out of scope until backend-backed workflow management is selected.
          </p>
          <div className="flowActions">
            <Link className="secondaryCta ctaLink" href="/agents">
              Return to workflows
            </Link>
            <Link className="primaryCta ctaLink" href="/agents">
              Save placeholder workflow
            </Link>
          </div>
        </section>
      </div>

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink" href="/">
          Hub
        </Link>
        <Link className="navLink" href="/projects">
          Projects
        </Link>
        <Link className="navLink navLinkActive" href="/agents">
          Agents
        </Link>
        <Link className="navLink" href="/deploy">
          Deploy
        </Link>
      </nav>
    </main>
  );
}

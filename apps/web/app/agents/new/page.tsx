import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

import { createWorkflowAction } from '../actions';
import { getProjectStore } from '../../../lib/project-store';

const templates = [
  {
    name: 'Run Tests',
    detail: 'Installs dependencies, runs the default test suite, and summarizes failures.',
    badge: 'badgeBlue',
    state: 'Suggested',
    value: 'run-tests',
  },
  {
    name: 'Build Project',
    detail: 'Runs a production build and captures the final artifact and warnings summary.',
    badge: 'badgeGreen',
    state: 'Ready',
    value: 'build-project',
  },
  {
    name: 'Inspect Repo',
    detail: 'Scans configs, docs, and recent diffs to prepare a focused review prompt.',
    badge: 'badgeAmber',
    state: 'Review',
    value: 'inspect-repo',
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
    description: 'Attach the workflow to one or more stored project shells.',
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
    value: 'manual-only',
  },
  {
    name: 'Weekdays · 08:30 UTC',
    detail: 'Runs a morning health pass before deploy windows.',
    badge: 'badgeGreen',
    state: 'Available',
    value: 'weekday-morning',
  },
];

type NewWorkflowPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

export default async function NewWorkflowPage({ searchParams }: NewWorkflowPageProps) {
  if (process.env.NODE_ENV !== 'test') {
    noStore();
  }

  const params = searchParams ? await searchParams : undefined;
  const availableProjects = await getProjectStore().listProjects();
  const showError = params?.status === 'missing-fields';

  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>New workflow</h1>
          <p className="subtle">
            A lightweight guided shell for saving reusable workflows before live execution and schedule runners are wired.
          </p>
        </div>
        <Link className="badge badgeBlue" href="/agents">
          Back
        </Link>
      </section>

      <form action={createWorkflowAction} className="grid">
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

        {showError ? (
          <section className="card flowErrorCard">
            <div className="cardTitle">
              <h2>Workflow details missing</h2>
              <span className="badge badgeAmber">Check steps 1 and 4</span>
            </div>
            <p className="subtle flowHint">
              Enter a workflow name and keep at least one project attached before saving the bounded reusable workflow record.
            </p>
          </section>
        ) : null}

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 1 · Template gallery</h2>
            <span className="badge badgeBlue">Choose a base</span>
          </div>

          <div className="inputStack">
            <label className="fieldShell fieldShellInteractive" htmlFor="workflow-name">
              <div className="fieldLabel">Workflow name</div>
              <input className="fieldInput" defaultValue="Build + Validate" id="workflow-name" name="name" required type="text" />
            </label>
          </div>

          <div className="selectionStack">
            {templates.map((template, index) => (
              <label className={`selectionCard selectionChoice${index === 0 ? ' selectionCardActive' : ''}`} key={template.name}>
                <input className="selectionInput" defaultChecked={index === 0} name="template" type="radio" value={template.value} />
                <div className="selectionBody">
                  <div className="selectionTitle">{template.name}</div>
                  <p className="subtle selectionCopy">{template.detail}</p>
                </div>
                <span className={`badge ${template.badge}`}>{template.state}</span>
              </label>
            ))}
          </div>

          <p className="subtle flowHint">
            The shell saves the selected template name and schedule into a bounded reusable workflow record. Editor wiring and provider execution remain out of scope.
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

          <p className="subtle flowHint">
            This static preview keeps the shell honest about step intent while full workflow editing remains out of scope.
          </p>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 3 · Schedule</h2>
            <span className="badge badgeAmber">Optional</span>
          </div>

          <div className="selectionStack">
            {schedules.map((schedule, index) => (
              <label className={`selectionCard selectionChoice${index === 0 ? ' selectionCardActive' : ''}`} key={schedule.name}>
                <input className="selectionInput" defaultChecked={index === 0} name="schedule" type="radio" value={schedule.value} />
                <div className="selectionBody">
                  <div className="selectionTitle">{schedule.name}</div>
                  <p className="subtle selectionCopy">{schedule.detail}</p>
                </div>
                <span className={`badge ${schedule.badge}`}>{schedule.state}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="card flowCard">
          <div className="cardTitle">
            <h2>Step 4 · Assign projects</h2>
            <span className="badge badgeBlue">Reusable</span>
          </div>

          <div className="selectionStack">
            {availableProjects.length === 0 ? (
              <div className="selectionCard">
                <div className="selectionBody">
                  <div className="selectionTitle">No projects available yet</div>
                  <p className="subtle selectionCopy">
                    Save a placeholder project first so this bounded workflow can attach to a real project shell.
                  </p>
                </div>
                <span className="badge badgeAmber">Unavailable</span>
              </div>
            ) : (
              availableProjects.map((project, index) => (
                <label className={`selectionCard selectionChoice${index === 0 ? ' selectionCardActive' : ''}`} key={project.slug}>
                  <input
                    className="selectionInput"
                    defaultChecked={index === 0}
                    name="projects"
                    type="checkbox"
                    value={project.slug}
                  />
                  <div className="selectionBody">
                    <div className="selectionTitle">{project.name}</div>
                    <p className="subtle selectionCopy">
                      {project.repo} · {project.workflow.label}
                    </p>
                  </div>
                  <span className={`badge ${project.host.badge}`}>{index === 0 ? 'Attach first' : 'Available'}</span>
                </label>
              ))
            )}
          </div>
        </section>

        <section className="card flowFooterCard">
          <div className="cardTitle">
            <h2>Ready to save</h2>
            <span className="badge badgeBlue">Bounded store</span>
          </div>
          <p className="subtle flowHint">
            This route now saves a bounded reusable workflow record for the single-user shell. Editing, live execution, and schedule runners still remain intentionally out of scope.
          </p>
          <div className="flowActions">
            <Link className="secondaryCta ctaLink" href="/agents">
              Return to workflows
            </Link>
            <button className="primaryCta" disabled={availableProjects.length === 0} type="submit">
              Save workflow shell
            </button>
          </div>
        </section>
      </form>

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

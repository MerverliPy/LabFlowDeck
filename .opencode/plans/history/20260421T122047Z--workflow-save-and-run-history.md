# Current Phase
Status: completed
Candidate ID: workflow-save-and-run-history

## Goal
Add a bounded server-owned workflow store so the Agents shell can save reusable workflows, show stored workflow state, and record manual placeholder run history that project detail can reference without claiming background execution.

## Why this phase is next
GitHub evidence still shows recent `Web CI` runs on `main` are green, with no open pull requests or open issues requiring a bounded regression fix first. The highest-priority eligible backlog work is now the workflow shell persistence seam: README still says `/agents/new` does not save workflows, `apps/web/app/agents/page.tsx` is still driven by hard-coded workflow and run-history arrays, `/agents/new` still ends in a placeholder link instead of a save action, and there is no `apps/web/app/agents/actions.ts` or `apps/web/lib/workflow-store.ts` yet. Selecting this phase keeps work inside `apps/web`, fits the six-file cap for product/docs changes, and creates the smallest honest workflow-backed seam needed before later activity-bridge or richer project-assignment follow-ups.

## Selection evidence
- Archive precondition check:
  - The completed current phase was already archived before overwrite at `.opencode/plans/history/20260421T114537Z--activity-feed-live-source.md`.
  - The archived file preserves the completed `activity-feed-live-source` record, so overwriting `current-phase.md` does not lose durable phase history.
- GitHub evidence reviewed first:
  - Workflow: `Web CI` is active.
  - Most recent 3 completed `push` runs on `main` for `Web CI` all succeeded: `24720725572` (`feat(web): add bounded shell activity feed`), `24720035044` (`feat(web): add bounded host heartbeat source`), and `24705462845` (`chore(workflow): refresh backlog candidate slate`).
  - Open pull requests: none.
  - Open issues: none.
  - Recent repo activity remains bounded shell work in `apps/web`, so no CI or repo regression outranked the next eligible backlog candidate.
- Evaluated candidate set:
  - Ineligible completed candidates ignored per `status_rules.ineligible_statuses`:
    - `patch-nextjs-security-line`
    - `reconcile-opencode-phase-state`
    - `publish-runtime-truth-readme`
    - `classify-screen-exports-reference`
    - `hub-mobile-shell`
    - `projects-list-shell`
    - `agents-panel-shell`
    - `deploy-panel-shell`
    - `web-health-route`
    - `decompose-deploy-client-surface`
    - `deploy-service-detail-sheet`
    - `project-detail-overview-shell`
    - `deploy-live-adapter-seam`
    - `projects-store-read-path`
    - `projects-new-persist-placeholder`
    - `host-heartbeat-shell-source`
    - `activity-feed-live-source`
  - Remaining pending candidates evaluated against current repo shape:
    - `github-auth-shell-session`
    - `github-repo-picker-live-source`
    - `workflow-save-and-run-history`
    - `project-host-picker-shell-source`
    - `deploy-project-link-shell`
    - `workflow-run-activity-bridge`
    - `mobile-playwright-smoke`
    - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - Completed candidates listed above were excluded because their backlog status is `completed`.
  - `github-auth-shell-session` was excluded as otherwise ineligible because `/login`, `/auth/github`, `/auth/github/callback`, `apps/web/lib/github-auth.ts`, and README already show a bounded GitHub login and shell session-presence flow shipping in the repo.
  - `github-repo-picker-live-source` was excluded as otherwise ineligible because `/projects/new`, `GET /api/github/repos`, `apps/web/lib/github.ts`, `apps/web/app/projects/actions.ts`, and README already show a bounded live GitHub repository picker shipping in the repo.
  - `project-host-picker-shell-source` was excluded because it is lower priority; although it is a good host-store follow-up, the workflow shell still has the larger honesty gap because `/agents` and `/agents/new` remain fully fixture-backed and project detail cannot yet reference a stored reusable workflow.
  - `deploy-project-link-shell` was excluded because it is lower priority and narrower than replacing the completely static workflow save/run path already visible on both Agents and project detail surfaces.
  - `workflow-run-activity-bridge` was excluded because it depends on workflow-run persistence that does not exist yet, while the selected phase creates that prerequisite cleanly.
  - `mobile-playwright-smoke` was excluded because it is cross-cutting test harness work, touches root configuration outside a single-module shell improvement, and current GitHub evidence does not show an urgent regression that should preempt product work.
  - `workflow-shell-truth-evals` was excluded because it is lower-priority `.opencode` hygiene work and current GitHub evidence does not show a workflow-audit regression that should preempt product-shell workflow persistence.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after removing completed and otherwise ineligible candidates.
- Why the selected candidate won:
  - `workflow-save-and-run-history` is the highest-priority eligible backlog candidate (`26`).
  - It matches the current code shape: `apps/web/app/agents/page.tsx` still defines hard-coded `workflows` and `recentRuns`; `apps/web/app/agents/new/page.tsx` still ends with a placeholder “Save placeholder workflow” link; `apps/web/app/agents/actions.ts` and `apps/web/lib/workflow-store.ts` do not exist; and README still states `/agents/new` does not save workflows or execute agents.
  - It stays within one module (`apps/web`), fits the backlog `max_files_changed: 6` constraint for product/docs files, has a clear validation path (`pnpm build:web`), and creates the prerequisite bounded workflow persistence seam before later activity-feed bridging or richer workflow assignment follow-ups.
- Expected validation command:
  - `pnpm build:web`

## Primary files
- `README.md`
- `apps/web/app/agents/new/page.tsx`
- `apps/web/app/agents/page.tsx`
- `apps/web/app/agents/actions.ts`
- `apps/web/app/projects/data.ts`
- `apps/web/lib/workflow-store.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk
Medium. The main risk is widening a bounded workflow shell store into a schedule engine, background executor, or broad persistence rollout instead of keeping it to reusable workflow records, explicit project references, and manual placeholder run history.

## In scope
- Add one bounded server-owned workflow store for reusable workflow records and manual placeholder run history.
- Add a server action so `/agents/new` can save a bounded workflow instead of ending with a placeholder-only link.
- Route `/agents` workflow cards and recent-run summaries through stored workflow data rather than hard-coded arrays.
- Let project detail reflect a saved workflow reference and bounded run-history summary without claiming live execution.
- Keep the workflow shell single-user and manual-first.

## Out of scope
- Live workflow execution, step streaming, background jobs, or schedule runners.
- Cron management, notifications, or calendar-style upcoming runs.
- Activity-feed bridging for workflow runs before the workflow store seam exists.
- Multi-user workflow sharing, RBAC, or broad persistence beyond this bounded workflow seam.

## Task checklist
- [x] Audit current workflow fixtures, missing save path, and project-detail workflow references in `/agents`, `/agents/new`, and the project-detail data path.
- [x] Add `apps/web/lib/workflow-store.ts` with bounded read/write helpers for reusable workflows and manual placeholder run history.
- [x] Add `apps/web/app/agents/actions.ts` and wire `/agents/new` to save a bounded workflow record.
- [x] Route `/agents` workflow cards and recent-run summaries through the workflow store instead of hard-coded arrays.
- [x] Update the project-detail data path to reflect stored workflow assignment and recent placeholder run history without claiming live execution.
- [x] Run `pnpm build:web`.

## Validation command
`pnpm build:web`

## Acceptance criteria checks
- [x] The new workflow route can save a bounded reusable workflow record.
  - Evidence: `apps/web/app/agents/new/page.tsx` now submits to `createWorkflowAction`; `apps/web/app/agents/actions.ts` validates project selection and writes through `createStoredWorkflow`; `apps/web/lib/workflow-store.ts` persists bounded in-memory workflow records; and Playwright verification on `http://127.0.0.1:3100/agents/new` saved `Morning Validate Sweep` and redirected to `/agents?status=saved`.
- [x] A project can reference a saved workflow and show its current assignment.
  - Evidence: `apps/web/lib/workflow-store.ts` exposes `getProjectWorkflowSnapshot`; `apps/web/app/projects/data.ts` merges stored workflow state into project overview data; README now states the Agents surfaces save bounded reusable workflow records; and Playwright verification on `http://127.0.0.1:3100/projects/labflowdeck` showed the saved workflow label and attached cadence in the Workflow section.
- [x] A manual placeholder run can create a persisted run-history record without introducing full background execution yet.
  - Evidence: `apps/web/app/agents/page.tsx` renders `Record manual run` forms; `apps/web/app/agents/actions.ts` writes through `recordManualWorkflowRun`; `apps/web/lib/workflow-store.ts` prepends bounded manual placeholder runs and derives project log summaries from them; and Playwright verification recorded a run that redirected to `/agents?status=run-recorded` before `/projects/labflowdeck` showed `Recorded ... ago` and a workflow log summary.
- [x] The web app build passes.
  - Evidence: `pnpm build:web` completed successfully on 2026-04-21 with type-checking and page generation for `/agents`, `/agents/new`, and `/projects/[slug]`.

## Validation

- Result: passed on 2026-04-21.
- Commands:
  - `pnpm build:web`
  - Playwright manual verification against `http://127.0.0.1:3100/agents`, `/agents/new`, and `/projects/labflowdeck` after starting the built app locally.
- Evidence:
  - Next.js built successfully with the updated Agents routes, project detail data path, and workflow store.
  - Mobile-sized Playwright checks confirmed the saved-workflow notice, the new fourth workflow count after saving, the manual run recording notice, and the propagated workflow state on the LabFlowDeck project detail route.

## Completion summary

Added a bounded reusable workflow store with fixture fallback, wired `/agents/new` to save single-user workflow records, wired `/agents` to render stored workflow cards plus manual placeholder run history, and merged project-detail workflow state from the same server-owned store. The shipped shell now honestly supports reusable workflow saving and manual run-history recording without claiming live workflow execution, schedule runners, or durable persistence beyond the bounded in-memory seam.

- README_CHECK: `README_REQUIRED`
- README_REASON: The phase changed visible `/agents`, `/agents/new`, and project-detail workflow behavior and updated shipped runtime truth about what the workflow shell can save and display.

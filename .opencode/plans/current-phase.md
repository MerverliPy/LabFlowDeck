# Current Phase
Status: active
Candidate ID: mobile-playwright-smoke

## Goal

- Deliver a reproducible Playwright smoke path for the `mobile-playwright-smoke` phase scope.
- Establish durable phase records for selected scope, validation command, and execution evidence.
- Reduce ambiguity before implementation by keeping current-phase.md aligned with backlog and planner expectations.

## Why this phase is next
The previous phase is completed and durably archived at `.opencode/plans/history/20260421T143124Z--workflow-run-activity-bridge.md`, and that archive path is already referenced from the candidate's backlog `evidence_refs`. GitHub evidence shows the latest `Web CI` runs on `main` are green, so there is no smaller urgent regression to preempt backlog order. The two higher-priority pending backlog entries are already implemented in the current repo shape, which leaves the Playwright smoke pass as the highest-priority eligible next step with a bounded `apps/web` scope.

## Selection evidence
- Evaluated candidate set:
  - `github-auth-shell-session`
  - `github-repo-picker-live-source`
  - `mobile-playwright-smoke`
  - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - `github-auth-shell-session` — backlog still says pending, but repo state already includes `/login`, `/auth/github`, `/auth/github/callback`, `apps/web/lib/github-auth.ts`, and honest README coverage for bounded GitHub shell session presence, so it is not eligible for reselection.
  - `github-repo-picker-live-source` — backlog still says pending, but repo state already includes `apps/web/lib/github.ts`, `GET /api/github/repos`, and a live bounded repo picker in `/projects/new`, so it is not eligible for reselection.
  - `workflow-shell-truth-evals` — still eligible, but it is lower priority, cross-module, and less aligned with the just-finished `apps/web` shell follow-up than the bounded mobile smoke candidate.
- Exact selection-order rule that picked the winner:
  - Rule 2: highest priority eligible backlog candidate, after excluding repo-state-complete pending entries; Rule 3 same-module follow-up reinforced the choice.
- Why the selected candidate won:
  - It is the highest-priority remaining eligible candidate.
  - It stays within the backlog's single-module and six-file bounds.
  - It validates already-shipped mobile shell flows instead of widening backend scope.
  - It has the clearest validation path through one dedicated Playwright command.
- Expected validation command:
  - `pnpm exec playwright test`

## Primary files
- `package.json`
- `pnpm-lock.yaml`
- `playwright.config.ts`
- `apps/web/e2e/auth-shell.spec.ts`
- `apps/web/e2e/projects-create.spec.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk

- Mobile/browser emulation or Playwright environment drift may produce false negatives.
- Auth, session, or route bootstrap issues may block smoke execution before feature-level checks begin.
- Incomplete phase documentation can create audit drift even when code work is correct.

## In scope
- Add the minimum root Playwright setup needed to run local smoke coverage against `apps/web`.
- Cover unauthenticated mobile entry into the bounded GitHub login shell.
- Cover the bounded project-creation shell on a phone-sized viewport.
- Keep the tests focused on honest current behavior, not future live GitHub, host-pairing, or orchestration claims.

## Out of scope
- Broad end-to-end coverage beyond the two bounded smoke flows.
- Live OAuth completion, real GitHub API mocking breadth, or deep project-detail automation.
- UI redesign, route expansion, or backend orchestration work.
- Workflow-audit prompt expansion outside this Playwright setup.

## Task checklist
- [ ] Add the minimum Playwright dependency and root config needed for phone-sized smoke runs.
- [ ] Configure the Playwright web server target so the suite can exercise `apps/web` locally.
- [ ] Add `apps/web/e2e/auth-shell.spec.ts` to verify the bounded login entry renders honest signed-out/auth-unavailable guidance on mobile.
- [ ] Add `apps/web/e2e/projects-create.spec.ts` to verify the bounded project-create flow on a phone-sized viewport.
- [ ] Keep assertions scoped to shipped shell behavior and avoid claims about live GitHub, host pairing, or orchestration.
- [ ] Run `pnpm exec playwright test`.

## Validation

Evidence: /next-phase selected candidate `mobile-playwright-smoke`.
Evidence: /phase-status reports `candidate_id: mobile-playwright-smoke`.
Evidence: /phase-status reports `current_phase_status: in_progress`.
Evidence: /phase-status reports `drift_detected: false`.
Evidence: current phase structure validator passed after section normalization.

- Validation evidence initialized for active phase.
- Execution-specific validation evidence will be appended as work completes.

## Acceptance criteria checks
- [ ] Playwright is configured at the repo root for browser smoke checks.
- [ ] Smoke coverage exists for unauthenticated shell entry and the bounded project-create flow.
- [ ] Tests run with a phone-sized viewport so mobile shell regressions are visible.
- [ ] The Playwright suite passes locally.

## Completion summary

- Phase `mobile-playwright-smoke` is active and implementation work has not been completed yet.
- This section is initialized with current phase state and will be updated as tasks close.
- Final completion notes will be added during `/finish-phase`.

## Validation command

`pnpm exec playwright test`

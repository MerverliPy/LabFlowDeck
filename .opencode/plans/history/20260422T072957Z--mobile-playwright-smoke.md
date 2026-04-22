# Current Phase
Status: completed
Candidate ID: mobile-playwright-smoke

## Goal

Add Playwright mobile smoke coverage for auth entry and bounded project creation.

## Why this phase is next

The previous active phase, `github-repo-picker-live-source`, is completed, reconciled in backlog, and durably archived at `.opencode/plans/history/20260422T061101Z--github-repo-picker-live-source.md`. With no narrower user scope than selecting the next implementation phase, the highest-priority eligible pending backlog candidate is now `mobile-playwright-smoke`. It is also the safest same-module follow-up because it verifies the recently shipped mobile auth-entry and project-creation shell paths without expanding runtime capabilities.

## Selection evidence

- Archive precondition check:
  - The completed previous phase is archived at `.opencode/plans/history/20260422T061101Z--github-repo-picker-live-source.md`.
  - The matching backlog candidate `github-repo-picker-live-source` references that archive path in `evidence_refs`, so overwriting `current-phase.md` preserves durable workflow history.
- Evaluated candidate set:
  - `mobile-playwright-smoke`
  - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - `workflow-shell-truth-evals` — valuable internal workflow hygiene, but it is lower priority than the highest-priority eligible pending candidate, not a same-module follow-up to the recent `apps/web` work, and the declared backlog order does not allow it to skip ahead here.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after ignoring completed candidates; `same_module_followup` further reinforced the choice, so no later selection rule was needed.
- Why the selected candidate won:
  - `mobile-playwright-smoke` is the highest-priority eligible pending candidate in backlog.
  - It keeps scope bounded to smoke coverage for already shipped auth-entry and project-create shells rather than widening product behavior.
  - It is the direct same-module follow-up to the recently completed GitHub auth/session and repo-picker work in `apps/web`.
  - Its validation path is explicit and auditable with a single Playwright command.
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

- Playwright setup could accidentally widen into broad end-to-end infrastructure instead of the bounded mobile smoke coverage authorized by this phase.
- Smoke tests must stay honest about shipped runtime behavior and avoid asserting live GitHub, host pairing, or background workflow execution that the product does not implement.
- Root-level test tooling updates can introduce dependency churn; keep package changes minimal and tied only to the declared Playwright coverage.

## In scope

- Configure repo-root Playwright coverage for local browser smoke checks if the needed setup is not already present.
- Add phone-sized smoke coverage for unauthenticated shell entry.
- Add phone-sized smoke coverage for the bounded project-create flow.
- Keep the phase limited to verifying shipped shell behavior without widening runtime capabilities.

## Out of scope

- New product runtime features or behavior changes in `apps/web` beyond minimal testability adjustments explicitly required by this phase.
- Broad end-to-end coverage outside auth entry and bounded project creation.
- Claims of live GitHub control, host pairing, workflow execution, or deploy orchestration.
- README changes unless the finished phase materially changes operator setup or shipped runtime truth.

## Task checklist

- [x] Inspect current Playwright, package, and `apps/web` test coverage to determine the minimum bounded setup needed for this candidate.
- [x] Add or reconcile repo-root Playwright configuration for local mobile smoke execution only.
- [x] Add a phone-sized smoke test for unauthenticated shell entry that stays honest about current auth behavior.
- [x] Add a phone-sized smoke test for the bounded project-create flow without asserting unshipped GitHub, host, or persistence behavior beyond the declared shell scope.
- [x] Run `pnpm exec playwright test` and record validation evidence.

## Validation

Status: PASS

Evidence:
- Added root Playwright tooling by installing `@playwright/test` in `package.json` and updating `pnpm-lock.yaml`.
- Added `playwright.config.ts` with repo-root smoke configuration, a phone-sized Chromium project, and a stable `webServer` that builds and starts the app before tests run.
- Added `apps/web/e2e/auth-shell.spec.ts` to verify the unauthenticated `/login` shell renders honest signed-out and bounded-auth messaging on a mobile viewport.
- Added `apps/web/e2e/projects-create.spec.ts` to verify the bounded `/projects/new` flow can create a placeholder project and redirect into its detail shell on a mobile viewport.
- `pnpm exec playwright test` passed on 2026-04-22 with `2 passed`.

Blockers:
- none

Ready to ship:
- yes

## Completion summary

- Added bounded repo-root Playwright smoke coverage for the shipped login and project-creation shell paths without widening runtime product capabilities.
- Stabilized the smoke environment by using a build-plus-start Playwright web server instead of relying on a volatile dev-server flow during test execution.
- README_CHECK: `README_NOT_NEEDED`
- README_REASON: this phase only added internal test tooling and smoke coverage; it did not change shipped runtime behavior, setup claims for operators, or product-surface truth.

## Validation command

`pnpm exec playwright test`

## Acceptance criteria checks

- [x] Playwright is configured at the repo root for browser smoke checks.
  Evidence: `package.json`, `pnpm-lock.yaml`, and `playwright.config.ts` now provide repo-root Playwright dependency and configuration.
- [x] Smoke coverage exists for unauthenticated shell entry and the bounded project-create flow.
  Evidence: `apps/web/e2e/auth-shell.spec.ts` covers `/login` and `apps/web/e2e/projects-create.spec.ts` covers `/projects/new` through placeholder-project creation.
- [x] Tests run with a phone-sized viewport so mobile shell regressions are visible.
  Evidence: `playwright.config.ts` runs the suite through the `mobile-chromium` project using Playwright's `Pixel 5` device preset.
- [x] The Playwright suite passes locally.
  Evidence: `pnpm exec playwright test` completed successfully on 2026-04-22 with `2 passed`.

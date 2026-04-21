# Current Phase
Status: completed
Candidate ID: workflow-run-activity-bridge

## Goal
Emit bounded activity records when a manual placeholder workflow run is recorded, and keep the workflow/project-detail shell coherent under the existing single-user, shell-first runtime boundaries.

## Why this phase was next
GitHub evidence showed the latest `Web CI` run on `main` failed immediately after the recent workflow/project-shell integration commit, with the break centered on `apps/web/app/projects/[slug]/page.test.tsx`. The two higher-priority pending backlog entries were already implemented in the repo, so the safest bounded follow-up was to bridge recorded workflow runs into the activity store and tighten the workflow/project-detail rendering seam.

## Selection evidence
- Evaluated candidate set:
  - `github-auth-shell-session`
  - `github-repo-picker-live-source`
  - `workflow-run-activity-bridge`
  - `mobile-playwright-smoke`
  - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - `github-auth-shell-session` — already implemented in repo state.
  - `github-repo-picker-live-source` — already implemented in repo state.
  - `mobile-playwright-smoke` — broader infra work than the current bounded regression.
  - `workflow-shell-truth-evals` — lower priority than the concrete apps/web workflow regression.
- Exact selection-order rule that picked the winner:
  - Rule 2: highest priority eligible backlog candidate, reinforced by Rule 3 same-module follow-up.
- Why the selected candidate won:
  - It was the highest-priority remaining eligible `apps/web` candidate.
  - It directly followed the bounded workflow store work.
  - It offered the smallest safe fix for the concrete workflow/project-detail integration gap.
- Expected validation command:
  - `pnpm --dir apps/web test && pnpm build:web`

## Primary files
- `apps/web/app/agents/actions.ts`
- `apps/web/lib/activity-store.ts`
- `apps/web/lib/workflow-store.ts`
- `apps/web/app/projects/data.ts`
- `apps/web/app/projects/[slug]/page.test.tsx`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk
Low to medium. The main risk was duplicating workflow state across logs and recent activity. The implementation stayed bounded to activity emission plus the smallest data/test adjustments needed to keep shell behavior honest.

## In scope
- Emit a bounded activity event when `recordManualWorkflowRun` succeeds.
- Revalidate the affected Agents and project-detail surfaces through the existing shell flow.
- Adjust the project-detail workflow/log rendering only as needed to keep workflow activity honest and non-duplicative.
- Tighten the existing failing test coverage for the project-detail shell.

## Out of scope
- Live workflow execution, background jobs, or streaming step output.
- New auth, repo sync, host pairing, or deployment orchestration scope.
- Broad Playwright rollout or unrelated `.opencode` audit work.

## Task checklist
- [x] Trace the manual workflow run path from `recordManualWorkflowRunAction` through the workflow store and project-detail read path.
- [x] Add a bounded workflow-run activity append path in `activity-store.ts`.
- [x] Invoke that activity path when a manual placeholder workflow run is recorded.
- [x] Ensure project-detail workflow/log or recent-activity sections render the new event without duplicate shell copy.
- [x] Update the failing `apps/web/app/projects/[slug]/page.test.tsx` assertions to match the bounded rendered behavior.
- [x] Run `pnpm --dir apps/web test && pnpm build:web`.

## Validation command
`pnpm --dir apps/web test && pnpm build:web`

## Acceptance criteria checks
- [x] Creating a bounded manual workflow run writes a matching activity record to the activity store.
  - Evidence: `apps/web/app/agents/actions.ts:63-87` appends a recorded workflow-run activity after `recordManualWorkflowRun` succeeds, and `apps/web/lib/activity-store.ts:290-301` persists the bounded activity event.
- [x] Project detail and workflow surfaces can render the recorded event without claiming background execution.
  - Evidence: `apps/web/lib/workflow-store.ts:379-435` keeps the workflow surface on bounded recorded-run labels/details, `apps/web/app/projects/data.ts:104-140` reads recent activity from the activity store without injecting duplicate workflow log rows, and `apps/web/app/projects/[slug]/page.test.tsx:46-72` verifies the recorded event appears in Recent activity.
- [x] The phase stays single-user and shell-first.
  - Evidence: `apps/web/lib/activity-store.ts:290-301` records bounded shell activity only, while `apps/web/lib/workflow-store.ts:387-398` continues to describe the run as a manual placeholder without background execution.
- [x] The web tests and build pass.
  - Evidence: `pnpm --dir apps/web test && pnpm build:web` passed on 2026-04-21.

## Validation
- Result: passed on 2026-04-21.
- Commands:
  - `pnpm --dir apps/web test && pnpm build:web`
- Evidence:
  - Vitest passed all 4 web test files and 9 tests.
  - Next.js production build completed successfully for `apps/web`.

## Completion summary
Added a bounded workflow-run activity bridge so manual placeholder runs now emit a matching recent-activity event for the linked project. To keep the shell honest and non-duplicative, the project-detail read path now relies on stored recent activity for that event instead of injecting extra workflow log metadata, and the previously failing project-detail test now covers both the scoped logs assertion and the new recent-activity path.

- README_CHECK: `README_NOT_NEEDED`
- README_REASON: The phase changed internal shell-state wiring and test coverage, but it did not change shipped routes, setup guidance, or runtime truth claims.

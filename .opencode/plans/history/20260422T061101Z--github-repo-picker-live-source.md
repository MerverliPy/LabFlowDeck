# Current Phase
Status: completed
Candidate ID: github-repo-picker-live-source

## Goal

Add a bounded live GitHub repository picker to the new project flow.

## Why this phase is next

The previous active phase, `github-auth-shell-session`, is completed, reconciled in backlog, and durably archived at `.opencode/plans/history/20260422T051727Z--github-auth-shell-session.md`. With no narrower user scope than resuming the workflow, the highest-priority eligible pending backlog candidate is now `github-repo-picker-live-source`. It is also the safest same-module follow-up to the completed auth/session phase because the bounded repo picker depends on that GitHub session groundwork.

## Selection evidence

- Archive precondition check:
  - The completed previous phase is archived at `.opencode/plans/history/20260422T051727Z--github-auth-shell-session.md`.
  - The matching backlog candidate `github-auth-shell-session` references that archive path in `evidence_refs`, so overwriting `current-phase.md` preserves durable workflow history.
- Evaluated candidate set:
  - `github-repo-picker-live-source`
  - `mobile-playwright-smoke`
  - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - `mobile-playwright-smoke` — bounded and useful, but lower priority than the next pending product slice and not a tighter follow-up than completing the repo-picker path.
  - `workflow-shell-truth-evals` — valuable internal hygiene, but lower priority than the highest-priority eligible candidate and not selected before the next bounded product follow-up.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after ignoring completed candidates; `same_module_followup` further reduced risk but was not needed as a tie-break.
- Why the selected candidate won:
  - `github-repo-picker-live-source` is the highest-priority eligible pending candidate in backlog.
  - It stays within one product module and the backlog's six-file cap.
  - It is the direct bounded follow-up to the completed GitHub auth/session phase, which reduces integration risk.
  - Its validation path is clear and already declared as `pnpm build:web`.
  - Initial repo inspection suggests the candidate may already be partially or fully present, making reconciliation within this exact scope safer than skipping ahead.
- Expected validation command:
  - `pnpm build:web`

## Primary files

- `apps/web/app/projects/new/page.tsx`
- `apps/web/app/api/github/repos/route.ts`
- `apps/web/app/projects/actions.ts`
- `apps/web/lib/github.ts`
- `apps/web/lib/project-store.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk

- The repo picker could overstate live GitHub integration if the shell does not clearly distinguish bounded selection from deeper sync and browsing capabilities.
- Persisting repo choice could accidentally widen into metadata ingestion or file-tree behavior that this phase does not authorize.
- Repo state appears ahead of backlog metadata in this area, so completion must be based on explicit acceptance checks and validation evidence rather than assumption.

## In scope

- Let an authenticated user fetch a bounded GitHub repository list during project creation.
- Persist the selected repository identifier onto the placeholder project record.
- Keep the repo-picker flow limited to shell-safe selection behavior for the single-user setup path.
- Reconcile existing repo state within this exact candidate scope if the implementation is already present.

## Out of scope

- File-tree browsing.
- Webhook sync or broad repository metadata ingestion.
- Multi-user GitHub account management.
- Host pairing, deploy orchestration, or broader workflow execution work.
- Any README, SPEC, or other protected-path edits not explicitly authorized by this phase.

## Task checklist

- [x] Inspect `/projects/new`, the GitHub repo API route, the GitHub helper, the project-create action, and the project store against this candidate's acceptance criteria.
- [x] Reconcile whether the bounded live repo-picker behavior is already fully implemented; otherwise complete only the missing in-scope gaps.
- [x] Confirm the selected repository identifier is saved onto the placeholder project record without widening into deeper GitHub integration.
- [x] Keep the phase bounded to repo-picker selection only and avoid file-tree browsing, webhook sync, or full metadata ingestion.
- [x] Run `pnpm build:web` and record validation evidence.

## Validation

Status: PASS

Evidence:
- Confirmed `apps/web/lib/github.ts` returns bounded signed-out, reauth-required, error, empty, and ready repo-picker states and limits live repository lookup to a small GitHub list for the authenticated shell.
- Confirmed `apps/web/app/api/github/repos/route.ts` exposes the bounded repo-picker route and returns honest 401/503 states instead of overstating live integration.
- Confirmed `apps/web/app/projects/new/page.tsx` uses the repo-picker state to render a live GitHub repo selection UI when available and falls back to manual repository entry otherwise.
- Confirmed `apps/web/app/projects/actions.ts` passes the selected `repo` and `repoSource` through project creation.
- Confirmed `apps/web/lib/project-store.ts` saves the selected repository identifier onto the placeholder project record while keeping file browsing, sync, and broader metadata ingestion out of scope.
- `pnpm build:web` passed on 2026-04-22 and generated `/api/github/repos` plus the `/projects/new` route.

Blockers:
- none

Ready to ship:
- yes

## Completion summary

- Reconciled the active phase against existing repo state: the bounded live GitHub repository picker, manual fallback, placeholder-project persistence, and thin repo API route were already implemented within the declared phase scope.
- No product-code changes were required during this reconciliation because the listed acceptance criteria were already satisfied by the current repo state.
- README_CHECK: `README_NOT_NEEDED`
- README_REASON: no shipped runtime behavior or implementation truth changed during this reconciliation run; only the active phase record was updated with validation evidence.
- Backlog completion metadata and durable archive were recorded at `.opencode/plans/history/20260422T061101Z--github-repo-picker-live-source.md`.

## Validation command

`pnpm build:web`

## Acceptance criteria checks

- [x] An authenticated user can fetch a bounded list of repositories from GitHub during project creation.
  Evidence: `apps/web/lib/github.ts` reads the signed session plus access token, fetches a limited GitHub repository list, and returns bounded picker states; `apps/web/app/api/github/repos/route.ts` exposes that payload through a thin authenticated route.
- [x] The selected repository identifier is saved onto the placeholder project record.
  Evidence: `apps/web/app/projects/new/page.tsx` submits the selected repository value, `apps/web/app/projects/actions.ts` forwards `repo` and `repoSource` into project creation, and `apps/web/lib/project-store.ts` persists the normalized repository identifier onto the placeholder project shell.
- [x] The phase does not add file-tree browsing, webhook sync, or full repo metadata ingestion yet.
  Evidence: `apps/web/app/projects/new/page.tsx` explicitly limits the flow to bounded repo selection with manual fallback, while `apps/web/lib/project-store.ts` stores only placeholder repository metadata and continues to describe live browsing and sync as not wired yet.
- [x] The web app build passes.
  Evidence: `pnpm build:web` completed successfully on 2026-04-22 and generated `/api/github/repos` and `/projects/new` in the build output.

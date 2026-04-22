# Current Phase
Status: completed
Candidate ID: github-auth-shell-session

## Goal

Add a bounded GitHub login flow and session presence for the shell without claiming downstream repo integration.

## Why this phase is next

The previous active phase, `clone-backend-internal-workflow`, is now completed, reconciled in backlog, and durably archived at `.opencode/plans/history/20260422T051108Z--clone-backend-internal-workflow.md`. With no explicit narrower user scope beyond advancing to the next phase, the highest-priority eligible pending backlog candidate is now `github-auth-shell-session`. It is bounded to one product module, fits the six-file change cap, and has a clear build validation path.

## Selection evidence

- Archive precondition check:
  - The completed previous phase was archived before overwrite at `.opencode/plans/history/20260422T051108Z--clone-backend-internal-workflow.md`.
  - The matching backlog candidate `clone-backend-internal-workflow` now marks that archive path in `evidence_refs`, so overwriting `current-phase.md` preserves durable workflow history.
- Evaluated candidate set:
  - `github-auth-shell-session`
  - `github-repo-picker-live-source`
  - `mobile-playwright-smoke`
  - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - `github-repo-picker-live-source` — lower priority than `github-auth-shell-session`, and it depends on auth/session groundwork being the safer first product slice.
  - `mobile-playwright-smoke` — bounded, but lower priority and more cross-cutting than the next product-shell capability gap in auth entry.
  - `workflow-shell-truth-evals` — same-module workflow hygiene, but lower priority than the highest-priority eligible product candidate and not selected by the declared order.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after ignoring completed candidates.
- Why the selected candidate won:
  - `github-auth-shell-session` is the highest-priority eligible pending candidate in backlog.
  - It is bounded to a single product module with six listed files, satisfying the backlog's single-module and safe-scope constraints.
  - It unlocks honest shell session presence before lower-priority repo-picker follow-up work.
  - It has a clear validation path through `pnpm build:web`.
- Expected validation command:
  - `pnpm build:web`

## Primary files

- `apps/web/app/login/page.tsx`
- `apps/web/app/auth/github/route.ts`
- `apps/web/app/auth/github/callback/route.ts`
- `apps/web/app/layout.tsx`
- `apps/web/lib/github-auth.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk

- OAuth failure handling could overstate session state if the shell does not distinguish configured, unauthenticated, and failed states clearly.
- Session presence could accidentally imply downstream repository sync or control that this phase does not implement.
- Auth changes affect visible shell behavior and will require README truth updates if the phase completes.

## In scope

- Add bounded GitHub OAuth initiation and callback handling for the single-user shell.
- Surface shell-visible session presence without claiming downstream repo integration.
- Guide unauthenticated users into login from the shell with honest success and failure states.
- Keep the implementation limited to shell session presence and routing boundaries.

## Out of scope

- Repository picker implementation.
- Webhook sync, repository metadata ingestion, or file-tree browsing.
- Multi-user auth, RBAC, or broader account management.
- Host, deploy, or workflow execution expansion.
- Claiming live GitHub control beyond bounded login/session presence.

## Task checklist

- [x] Inspect existing `/login`, auth route, and session shell surfaces for current gaps against the phase acceptance criteria.
- [x] Implement bounded GitHub OAuth initiation and callback handling for the single-user shell.
- [x] Surface session presence in the shell and guide unauthenticated users into login without overstating downstream integration.
- [x] Update README runtime truth if the shipped auth/session behavior changes.
- [x] Run `pnpm build:web` and record validation evidence.

## Validation

Status: PASS

Evidence:
- Confirmed the bounded GitHub auth/session implementation is already present in `apps/web/app/login/page.tsx`, `apps/web/app/auth/github/route.ts`, `apps/web/app/auth/github/callback/route.ts`, `apps/web/app/layout.tsx`, and `apps/web/lib/github-auth.ts`.
- Confirmed README already documents `/login`, `/auth/github`, `/auth/github/callback`, the bounded session truth, and the required OAuth environment variables.
- `pnpm build:web` passed on 2026-04-22.

Blockers:
- none

Ready to ship:
- yes

## Completion summary

- Reconciled the active phase against existing repo state: the bounded single-user GitHub OAuth entry, callback handling, and shell session-presence surface were already implemented and validated.
- README_CHECK: `README_REQUIRED`
- README_REASON: this phase changes visible auth/session behavior and setup truth, and the existing README already reflects those shipped routes and OAuth setup requirements, so no further README edit was needed during this reconciliation.
- Backlog completion metadata and durable archive were recorded at `.opencode/plans/history/20260422T051727Z--github-auth-shell-session.md`.

## Validation command

`pnpm build:web`

## Acceptance criteria checks

- [x] Single-user GitHub OAuth can be initiated and completed with clear success and failure handling.
  Evidence: `apps/web/app/auth/github/route.ts` starts the OAuth redirect and stores state; `apps/web/app/auth/github/callback/route.ts` handles denied, missing-code, state-mismatch, token-exchange, profile-failure, and connected outcomes before redirecting back to `/login` with explicit status.
- [x] The shell can detect whether a GitHub session exists without overstating downstream repo integration.
  Evidence: `apps/web/lib/github-auth.ts` signs and reads the bounded session cookie; `apps/web/app/login/page.tsx` renders connected versus signed-out session state with explicit scope limits; and `apps/web/app/layout.tsx` surfaces shell session presence while stating that repo discovery, sync, and live controls land later.
- [x] Unauthenticated users are guided into login from the shell.
  Evidence: `apps/web/app/layout.tsx` shows a top-of-shell GitHub session card with a `/login` link when signed out, and `apps/web/app/login/page.tsx` provides the guided bounded auth entry with explicit unavailable/configuration messaging.
- [x] The web app build passes.
  Evidence: `pnpm build:web` completed successfully on 2026-04-22 and generated `/login`, `/auth/github`, and `/auth/github/callback` in the build output.

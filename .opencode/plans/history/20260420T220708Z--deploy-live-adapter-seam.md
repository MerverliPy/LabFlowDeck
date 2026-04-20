# Current Phase

Status: completed

Candidate ID: deploy-live-adapter-seam

## Goal

Replace the Deploy route's hard-coded status source with a single configured server-side adapter seam for one environment while preserving the current mobile shell and thin API contracts.

## Why this phase is next

The Deploy surface already has a coherent mobile UI plus thin `GET /api/deploy/status` and `POST /api/deploy/actions` routes, and `apps/web/app/deploy/data.ts` is the narrowest seam where real server-owned data can replace simulated arrays without broad UI churn. This phase is next because it is the highest-priority eligible backlog candidate, stays within one module (`apps/web`), fits the backlog `max_files_changed: 6` constraint, and has a clean validation path through `pnpm build:web`.

## Selection evidence

- Archive precondition check:
  - The overwritten phase was already archived before this update at `.opencode/plans/history/20260420T215019Z--project-detail-section-shells.md`.
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
  - Eligible pending candidates evaluated:
    - `deploy-live-adapter-seam`
    - `projects-store-read-path`
    - `projects-new-persist-placeholder`
    - `github-auth-shell-session`
    - `github-repo-picker-live-source`
    - `host-heartbeat-shell-source`
    - `activity-feed-live-source`
    - `workflow-save-and-run-history`
- Excluded candidates and why:
  - Completed candidates listed above were excluded because their status is `completed`.
  - `projects-store-read-path` was excluded because it has lower priority than the winning candidate and would start a new project-store seam across list, detail, and create routes instead of using the already-centralized Deploy adapter seam.
  - `projects-new-persist-placeholder` was excluded because it is lower priority and broadens scope across form submission, storage, list reload, and detail resolution.
  - `github-auth-shell-session` was excluded because it is lower priority and introduces a broader auth/session surface than the current thin Deploy data seam.
  - `github-repo-picker-live-source` was excluded because it is lower priority and depends on upstream auth plus placeholder project persistence to be fully coherent.
  - `host-heartbeat-shell-source` was excluded because it is lower priority and spans Hub plus project-detail surfaces, making it less bounded than the Deploy-only seam.
  - `activity-feed-live-source` was excluded because it is lower priority and touches multiple surfaces plus action-producing routes, which is a wider validation surface.
  - `workflow-save-and-run-history` was excluded because it is lower priority and spans Agents, Projects, actions, and a new workflow store.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after removing `completed` candidates per `status_rules.ineligible_statuses`.
- Why the selected candidate won:
  - `deploy-live-adapter-seam` is the highest-priority eligible candidate (`40`), remains single-module, exactly fits the six-file backlog cap, and maps cleanly onto the current code shape where the Deploy page and thin API routes already funnel through `apps/web/app/deploy/data.ts`.
  - It advances the product from shell-only simulated deploy data toward a real control-plane seam without jumping ahead into auth, workflow execution, or broader backend orchestration.
- Expected validation command:
  - `pnpm build:web`

## Primary files

- `apps/web/app/deploy/data.ts`
- `apps/web/app/api/deploy/status/route.ts`
- `apps/web/app/api/deploy/actions/route.ts`
- `apps/web/app/deploy/types.ts`
- `apps/web/lib/deploy-adapter.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed

6

## Risk

Medium-low. The main risk is widening the adapter contract or accidentally changing the existing Deploy shell response shape while introducing a real server-owned seam.

## In scope

- Add a single server-side deploy adapter module for one configured environment.
- Move Deploy status reads behind that adapter instead of directly cloning an in-file base deployment array.
- Forward one safe Deploy action type through the adapter while preserving invalid-payload rejection.
- Keep the current mobile Deploy page contract, filters, detail sheet, and confirmation-gated behavior intact.

## Out of scope

- Full Docker or Docker Compose execution coverage.
- Multi-environment or multi-provider deployment abstraction.
- A broad backend orchestration engine.
- Auth, project persistence, host heartbeat storage, or activity-feed persistence.
- Deploy UI redesign beyond what is needed to preserve the existing contract.

## Task checklist

- [x] Audit the current Deploy page data and API response shapes that must remain stable.
- [x] Create `apps/web/lib/deploy-adapter.ts` as the single server-side seam for one configured environment.
- [x] Update `apps/web/app/deploy/data.ts` to read status through the adapter instead of the hard-coded base deployment array.
- [x] Update the Deploy action path so one safe action type forwards through the adapter and rejected payloads stay explicit.
- [x] Keep deploy types honest about the adapter-backed mode without breaking the current shell contract.
- [x] Run `pnpm build:web`.

## Validation command

`pnpm build:web`

## Acceptance criteria checks

- [x] The Deploy data path reads from one configured server-side adapter instead of the hard-coded base deployment array.
  - Evidence: `apps/web/app/deploy/data.ts:1-15`; `apps/web/lib/deploy-adapter.ts:143-170`; `apps/web/lib/deploy-adapter.ts:189-246`.
- [x] `GET /api/deploy/status` continues to satisfy the existing shell contract while returning adapter-backed data.
  - Evidence: `apps/web/app/api/deploy/status/route.ts:1-6`; `apps/web/app/deploy/types.ts:67-97`; `apps/web/lib/deploy-adapter.ts:189-202`.
- [x] `POST /api/deploy/actions` forwards one safe action type through the adapter and still rejects invalid payloads.
  - Evidence: `apps/web/app/api/deploy/actions/route.ts:9-59`; `apps/web/lib/deploy-adapter.ts:172-239`.
- [x] The Deploy route remains mobile-first and the web app build passes.
  - Evidence: `apps/web/app/deploy/DeployPageClient.tsx:171-229`; validation section below records the successful `pnpm build:web` run from 2026-04-20.

## Validation

- Result: passed on 2026-04-20.
- Command: `pnpm build:web`
- Evidence:
  - The static deploy array was removed from `apps/web/app/deploy/data.ts` and replaced with a server-side adapter import from `apps/web/lib/deploy-adapter.ts`.
  - `GET /api/deploy/status` remained available and `/deploy` rendered as a dynamic route in the production build output.
  - `POST /api/deploy/actions` preserved explicit invalid-payload rejection and now forwards only the bounded deployment-level `deploy` action through the adapter seam.

## Completion summary

Added a configured single-environment deploy adapter seam, moved Deploy status reads behind that server-owned adapter, kept the existing mobile shell contract intact, made `/deploy` request-time dynamic via `noStore()`, and constrained the action route to one safe forwarded action while preserving explicit rejection for invalid payloads.

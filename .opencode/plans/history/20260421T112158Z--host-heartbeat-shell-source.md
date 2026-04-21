# Current Phase
Status: completed
Candidate ID: host-heartbeat-shell-source

## Goal
Add one bounded host heartbeat source so Hub and project detail stop relying on hard-coded host status text and instead read honest, stored heartbeat state.

## Why this phase is next
GitHub evidence shows no failing CI, no open pull requests, and no open issues that should override backlog-driven planning with a bounded regression fix. In the shipped shell, Hub, Projects, and project detail still hard-code host health and heartbeat copy even though GitHub auth and repo picking are already live. A single host heartbeat seam is therefore the next smallest meaningful step: it improves the honesty of existing host status surfaces, stays inside `apps/web`, fits the six-file cap, and reduces risk for later host-selection work.

## Selection evidence
- Archive precondition check:
  - The completed phase being overwritten was archived before this update at `.opencode/plans/history/20260421T105954Z--internal-workflow-provider-switch.md`.
  - That archived phase references a completed candidate that is no longer present in backlog; selection for the next phase therefore used the current backlog plus repo code shape instead of reviving the stale completed plan.
- GitHub evidence reviewed first:
  - Recent `Web CI` runs on `main` are green.
  - There are no open pull requests.
  - There are no open issues.
  - No concrete broken workflow or regression outranked the next eligible backlog candidate.
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
  - Remaining pending candidates evaluated against current repo shape:
    - `github-auth-shell-session`
    - `github-repo-picker-live-source`
    - `host-heartbeat-shell-source`
    - `activity-feed-live-source`
    - `workflow-save-and-run-history`
    - `project-host-picker-shell-source`
    - `deploy-project-link-shell`
    - `workflow-run-activity-bridge`
    - `mobile-playwright-smoke`
    - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - Completed candidates listed above were excluded because their status is `completed`.
  - `github-auth-shell-session` was excluded as otherwise ineligible because `/login`, `/auth/github`, `/auth/github/callback`, `apps/web/lib/github-auth.ts`, and README already show a bounded GitHub login and session-presence flow shipping in the repo.
  - `github-repo-picker-live-source` was excluded as otherwise ineligible because `/projects/new`, `GET /api/github/repos`, `apps/web/lib/github.ts`, and README already show a bounded live GitHub repository picker shipping in the repo.
  - `activity-feed-live-source` was excluded because it is lower priority and spans more write surfaces (`/`, project detail, deploy actions, and project actions) than the bounded host heartbeat seam.
  - `workflow-save-and-run-history` was excluded because it is lower priority and introduces a broader new workflow persistence surface across Agents and Projects.
  - `project-host-picker-shell-source` was excluded because it depends on a trustworthy stored host source first; otherwise the new-project flow would still pick from static host presets.
  - `deploy-project-link-shell` was excluded because it is lower priority and narrower product value than replacing hard-coded host status text already shown in Hub and project detail.
  - `workflow-run-activity-bridge` was excluded because it depends on workflow run persistence and activity storage that do not exist yet.
  - `mobile-playwright-smoke` was excluded because it is cross-cutting test harness work rather than the highest-priority eligible product-shell seam.
  - `workflow-shell-truth-evals` was excluded because it is lower-priority `.opencode` hygiene work and current CI evidence does not indicate a workflow-truth regression that should preempt app-shell honesty work.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after removing completed and otherwise ineligible candidates.
- Why the selected candidate won:
  - `host-heartbeat-shell-source` is the highest-priority eligible backlog candidate (`30`).
  - It matches the current code shape: `apps/web/app/page.tsx`, `apps/web/app/projects/data.ts`, and `apps/web/app/projects/[slug]/page.tsx` still embed host status or heartbeat text directly, so one host-store seam can improve multiple existing surfaces without widening into full host pairing.
  - It stays in one module (`apps/web`), fits the backlog `max_files_changed: 6` constraint, preserves shell-first honesty, and prepares the later host-picker candidate to consume stored host data instead of hard-coded options.
- Expected validation command:
  - `pnpm build:web`

## Primary files
- `apps/web/app/api/hosts/heartbeat/route.ts`
- `apps/web/app/page.tsx`
- `apps/web/app/projects/data.ts`
- `apps/web/app/projects/[slug]/page.tsx`
- `apps/web/lib/host-store.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk
Medium-low. The main risk is widening a bounded heartbeat seam into speculative host pairing or letting host store data drift from the existing project shell contract.

## In scope
- Add one bounded server-owned host store for a configured host heartbeat record.
- Add one thin heartbeat route that exposes bounded host status data.
- Update Hub host summary to read from stored heartbeat state instead of only hard-coded text.
- Update project detail host status and heartbeat displays to read from stored heartbeat state.
- Map stale or missing heartbeat data to honest degraded or offline shell states.

## Out of scope
- Full host pairing, SSH transport, or agent installation.
- Multi-host orchestration, editing host records, or a full hosts management UI.
- Project creation host picker changes beyond what existing stored host data may later enable.
- Live deploy or workflow execution work.

## Task checklist
- [x] Audit the current hard-coded host status and heartbeat text in Hub and project surfaces.
- [x] Add `apps/web/lib/host-store.ts` with one bounded configured host heartbeat read path and honest stale-state mapping.
- [x] Add `GET /api/hosts/heartbeat` as a thin route over the host store.
- [x] Route Hub host summary in `apps/web/app/page.tsx` through the stored heartbeat source.
- [x] Route project detail host status and heartbeat text through stored heartbeat data without widening the shell contract.
- [x] Run `pnpm build:web`.

## Validation command
`pnpm build:web`

## Acceptance criteria checks
- [x] One configured host can report heartbeat and bounded health data to a server-side store.
  - Evidence: `apps/web/lib/host-store.ts` adds a bounded configured or fixture-backed heartbeat source, resolves host state from stored timestamps, and exposes response helpers; `apps/web/app/api/hosts/heartbeat/route.ts` returns that store through a thin dynamic GET handler.
- [x] Hub and project detail surfaces read host status from stored heartbeat data instead of only hard-coded status text.
  - Evidence: `apps/web/app/page.tsx` derives Hub badges, connected-host counts, and host alerts from `getHostHeartbeatResponse`; `apps/web/app/projects/data.ts` overlays stored heartbeat detail, state, badge, and latency onto project records before `apps/web/app/projects/[slug]/page.tsx` renders `project.host.*`.
- [x] Stale or missing heartbeat data maps to honest degraded or offline shell states.
  - Evidence: `apps/web/lib/host-store.ts` marks stale timestamps degraded, marks long-stale or missing heartbeats offline, and returns explicit `Awaiting first heartbeat` copy instead of guessed healthy status.
- [x] The web app build passes.
  - Evidence: `pnpm build:web` completed successfully and included the new `/api/hosts/heartbeat` route in the build output.

## Validation

- Result: passed on 2026-04-21.
- Command: `pnpm build:web`
- Evidence:
  - Next.js built successfully with type-checking and page generation completed.
  - The build output included the bounded `ƒ /api/hosts/heartbeat` route.

## Completion summary

Added a bounded server-side host heartbeat store plus `GET /api/hosts/heartbeat`, then routed Hub and project-detail host summaries through stored heartbeat state instead of hard-coded status text. The shell now degrades stale heartbeats honestly, shows missing heartbeat records as offline, and keeps broader host pairing and transport work explicitly out of scope.

- README_CHECK: `README_REQUIRED`
- README_REASON: The phase changed visible host-status behavior on `/`, added a shipped thin API route, and updated runtime-truth documentation for bounded host heartbeat support.

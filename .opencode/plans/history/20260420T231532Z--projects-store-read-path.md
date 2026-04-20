# Current Phase

Status: completed

Candidate ID: projects-store-read-path

## Goal

Move the Projects list and project detail shells off hard-coded in-file arrays onto a bounded server-owned read path while preserving the current mobile-first shell and keeping project creation shell-only.

## Why this phase is next

The Projects surfaces already centralize their shell data in `apps/web/app/projects/data.ts`, and both `/projects` and `/projects/[slug]` read through that one module today. Replacing that static source with a server-owned read seam is the smallest meaningful next step because it unlocks honest empty-state behavior, de-risks the later placeholder save flow, stays inside one module, fits the backlog six-file cap, and has a clear validation path through `pnpm build:web`.

## Selection evidence

- Archive precondition check:
  - The completed phase being overwritten was already archived before this update at `.opencode/plans/history/20260420T220708Z--deploy-live-adapter-seam.md`.
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
  - Eligible pending candidates evaluated:
    - `projects-store-read-path`
    - `projects-new-persist-placeholder`
    - `github-auth-shell-session`
    - `github-repo-picker-live-source`
    - `host-heartbeat-shell-source`
    - `activity-feed-live-source`
    - `workflow-save-and-run-history`
- Excluded candidates and why:
  - Completed candidates listed above were excluded because their status is `completed`.
  - `projects-new-persist-placeholder` was excluded because it is lower priority and depends on a trustworthy read path first; adding writes before a server-owned read seam would increase integration risk across create, list reload, and detail resolution.
  - `github-auth-shell-session` was excluded because it is lower priority and opens a broader auth/session surface than the already-centralized Projects read seam.
  - `github-repo-picker-live-source` was excluded because it is lower priority and depends on upstream GitHub session presence plus placeholder project persistence to feel coherent.
  - `host-heartbeat-shell-source` was excluded because it is lower priority and spans Hub plus project-detail host summaries, which is a wider validation surface than the Projects read path alone.
  - `activity-feed-live-source` was excluded because it is lower priority and crosses multiple routes plus action-producing writes, making it less bounded than replacing one centralized Projects data source.
  - `workflow-save-and-run-history` was excluded because it is lower priority and introduces a new workflow storage plus run-history surface across Agents and Projects.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after removing `completed` candidates per `status_rules.ineligible_statuses`.
- Why the selected candidate won:
  - `projects-store-read-path` is the highest-priority eligible candidate (`38`).
  - It stays inside `apps/web`, fits the backlog `max_files_changed: 6` constraint exactly, and maps cleanly to the current code shape where `apps/web/app/projects/data.ts` is the single read seam for both the Projects list and detail route.
  - It is also the safest precursor to later project persistence work because it establishes the read contract before any write flow claims stored behavior.
- Expected validation command:
  - `pnpm build:web`

## Primary files

- `apps/web/app/projects/data.ts`
- `apps/web/app/projects/page.tsx`
- `apps/web/app/projects/[slug]/page.tsx`
- `apps/web/app/projects/new/page.tsx`
- `apps/web/lib/project-store.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed

6

## Risk

Medium-low. The main risk is accidentally widening the scope from a read seam into persistence or disturbing the current list/detail shell contract while introducing honest empty-state handling.

## In scope

- Add one bounded server-owned project store/read module for the single-user shell.
- Route Projects list and project detail reads through that store instead of only hard-coded in-file arrays.
- Make the Projects list honest when no stored projects exist.
- Keep the current mobile-first Projects shell and detail route intact apart from the store-backed read path.

## Out of scope

- Saving new project records.
- Live GitHub repository fetching or OAuth.
- Host discovery, host control, or deployment auto-detection.
- Activity persistence, workflow persistence, or background execution.
- Broad Projects UI redesign beyond what is needed to preserve the current shell contract.

## Task checklist

- [x] Audit the current `apps/web/app/projects/data.ts` exports and the `/projects`, `/projects/[slug]`, and `/projects/new` consumers that depend on them.
- [x] Create `apps/web/lib/project-store.ts` as the bounded server-owned read seam for shell project records.
- [x] Update `apps/web/app/projects/data.ts` to source project list/detail reads from the store instead of only exporting hard-coded arrays.
- [x] Update the Projects list to render an honest empty state when the store returns no projects.
- [x] Keep the project detail route and new-project flow shell-only while aligning them with the store-backed read path.
- [x] Run `pnpm build:web`.

## Validation command

`pnpm build:web`

## Acceptance criteria checks

- [x] The Projects list and project detail routes read through a server-owned project store or adapter rather than only hard-coded in-file arrays.
  - Evidence: `apps/web/app/projects/data.ts:1-109`; `apps/web/lib/project-store.ts:375-410`; `apps/web/app/projects/page.tsx:1-7`; `apps/web/app/projects/[slug]/page.tsx:12-27`.
- [x] Empty-state behavior is honest when no stored projects exist.
  - Evidence: `apps/web/app/projects/page.tsx:53-77`; `apps/web/lib/project-store.ts:375-399`.
- [x] The project detail route remains shell-only and does not introduce live GitHub or host control yet.
  - Evidence: `apps/web/app/projects/[slug]/page.tsx:73-267`; `apps/web/app/projects/new/page.tsx:193-195`.
- [x] The web app build passes.
  - Evidence: validation section below records the successful `pnpm build:web` run from 2026-04-20.

## Validation

- Result: passed on 2026-04-20.
- Command: `pnpm build:web`
- Evidence:
  - `apps/web/lib/project-store.ts` now owns the bounded server-side project read seam and accepts `LABFLOWDECK_PROJECTS_JSON`, including an explicit empty array that produces an honest empty Projects state.
  - `apps/web/app/projects/data.ts` now marks Projects reads dynamic and routes both list and detail lookups through the shared project store.
  - `pnpm build:web` completed successfully, and the production build output kept `/projects` and `/projects/[slug]` as dynamic server-rendered routes.

## Completion summary

Added a bounded server-owned Projects read seam, moved list/detail reads behind it, made the Projects summary metrics derive from stored data, rendered an honest empty state when the store is empty, and kept the detail plus new-project flows explicitly shell-only while the web build stayed green.

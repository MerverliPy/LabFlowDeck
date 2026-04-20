# Current Phase

Status: completed

Candidate ID: project-detail-overview-shell

## Goal

Add a mobile-first project detail overview route linked from `/projects` so users can drill into one project's repository, host, workflow, deployment, and activity summary without adding live integrations.

## Why this phase is next

`SPEC.md` calls for tapping a project card to open Project Detail, and the current code shape already has a shipped `/projects` list shell but no per-project route. This candidate is the smallest meaningful next vertical slice: it stays inside `apps/web`, follows the existing Projects module, fits the backlog file-change budget, and has a clear `pnpm build:web` validation path.

## Selection evidence

- Evaluated candidate set: `project-detail-overview-shell`.
- Excluded candidates and why:
  - `patch-nextjs-security-line` — excluded because status is `completed`.
  - `reconcile-opencode-phase-state` — excluded because status is `completed`.
  - `publish-runtime-truth-readme` — excluded because status is `completed`.
  - `classify-screen-exports-reference` — excluded because status is `completed`.
  - `hub-mobile-shell` — excluded because status is `completed`.
  - `projects-list-shell` — excluded because status is `completed`.
  - `agents-panel-shell` — excluded because status is `completed`.
  - `deploy-panel-shell` — excluded because status is `completed`.
  - `web-health-route` — excluded because status is `completed`.
  - `decompose-deploy-client-surface` — excluded because status is `completed`.
  - `deploy-service-detail-sheet` — excluded because status is `completed`.
- Exact selection-order rule that decided the winner: `highest_priority` after ignoring `completed` candidates per `status_rules.ineligible_statuses`.
- Why the selected candidate beat other eligible candidates: it was the only eligible candidate, and it remained bounded to one module (`apps/web`) with an actual 6-file implementation surface and no speculative backend expansion.
- Expected validation command: `pnpm build:web`.

## Primary files

- `apps/web/app/projects/page.tsx`
- `apps/web/app/projects/[slug]/page.tsx`
- `apps/web/app/projects/data.ts`
- `apps/web/app/globals.css`
- `README.md`
- `.opencode/plans/current-phase.md`

## Expected max files changed

6

## Risk

Low. The main risk was scope creep into full project-detail tabs or fake live integrations instead of keeping the route as a shell-only overview.

## In scope

- Add a dedicated `/projects/[slug]` overview route.
- Link existing project cards from `/projects` to the detail route.
- Show project identity, repository summary, linked host status, workflow summary, deployment summary, and recent activity in a mobile-first layout.
- Reuse bounded mock or shared shell data only.
- Update README implemented-surfaces documentation for the new runtime route.

## Out of scope

- Repository file browsing or file-content viewing.
- Terminal runtime controls or command execution.
- Workflow editing, live run monitoring, or scheduling controls.
- Live GitHub, host, auth, or persistence integrations.
- Multi-tab or broad project-detail expansion beyond the overview shell.

## Task checklist

- [x] Audit the existing `/projects` list shell and choose the smallest linking pattern for project cards.
- [x] Add bounded project detail data usable by both the list and `/projects/[slug]` route if needed.
- [x] Build the `/projects/[slug]` mobile overview route with repository, host, workflow, deploy, and recent activity sections.
- [x] Keep navigation coherent on mobile, including a clear return path to `/projects`.
- [x] Update README to list the new shipped runtime route honestly.

## Acceptance criteria checks

- [x] Project cards in `/projects` link to a dedicated mobile detail route.
  - Evidence: `apps/web/app/projects/page.tsx:49-90`; `apps/web/app/projects/[slug]/page.tsx:22-27`.
- [x] The detail route shows project identity, repository summary, linked host status, workflow summary, deployment summary, and recent activity in a mobile-first layout.
  - Evidence: `apps/web/app/projects/[slug]/page.tsx:22-167`; `apps/web/app/projects/data.ts:54-257`; `apps/web/app/globals.css:503-565`.
- [x] The route stays shell-only and does not introduce live GitHub, host, or persistence integrations.
  - Evidence: `apps/web/app/projects/data.ts:54-257`; `apps/web/app/projects/[slug]/page.tsx:158-166`; `README.md:65`.
- [x] README includes the new runtime route in the implemented surfaces list.
  - Evidence: `README.md:42-49`.
- [x] The web app build passes.
  - Evidence: Validation section below records the successful `pnpm build:web` run from 2026-04-20.

## Validation command

`pnpm build:web`

## Validation

- Result: passed on 2026-04-20.
- Command: `pnpm build:web`
- Evidence:
  - Next.js production build completed successfully.
  - The build output included `/projects` and `/projects/[slug]` in the route manifest.

## Completion summary

Implemented shared project shell data, linked each project card to `/projects/[slug]`, shipped the mobile overview route with repository, host, workflow, deployment, recent activity, and scope-boundary sections, updated README to document the new runtime route honestly, and passed `pnpm build:web`.

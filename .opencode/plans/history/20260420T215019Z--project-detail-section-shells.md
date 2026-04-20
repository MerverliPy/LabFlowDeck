# Current Phase

Status: completed

Candidate ID: project-detail-section-shells

## Goal

Extend `/projects/[slug]` into a more spec-aligned mobile project detail shell by adding section navigation plus bounded Runtime, Logs, and Stats sections without introducing live integrations.

## Why this phase is next

`SPEC.md` says Project Detail should expose Repository, Terminal Runtime, Workflow, Deployments, Logs, and Stats sections, and the current code already ships `/projects/[slug]` as an overview shell. The most bounded next step is a same-module follow-up that fills the clearest remaining UI gaps on that route, stays inside `apps/web`, reuses the existing shared project detail data shape, and keeps validation to `pnpm build:web`.

## Selection evidence

- Evaluated candidate set: `project-detail-section-shells`.
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
  - `project-detail-overview-shell` — excluded because status is `completed`.
- Exact selection-order rule that decided the winner: `highest_priority` after ignoring `completed` candidates per `status_rules.ineligible_statuses`; this also matched the `same_module_followup` preference because the previous shipped phase was the project detail overview shell.
- Why the selected candidate won: it is the only eligible candidate, it closes the most obvious remaining gap in the existing `/projects/[slug]` route, and it stays bounded to one module (`apps/web`) with a 4-file planned implementation surface and no speculative backend work.
- Expected validation command: `pnpm build:web`.

## Primary files

- `apps/web/app/projects/[slug]/page.tsx`
- `apps/web/app/projects/[slug]/page.test.tsx`
- `apps/web/app/projects/data.ts`
- `apps/web/app/globals.css`
- `.opencode/plans/current-phase.md`

## Expected max files changed

5

## Risk

Low. The main risk is overloading the project detail route with too many new controls instead of keeping the additions as compact shell-only summaries and jump navigation.

## In scope

- Add a compact mobile section navigation or jump rail near the top of `/projects/[slug]`.
- Add shell-only Terminal Runtime, Logs, and Stats sections to the existing project detail route.
- Extend bounded project detail data to support those sections.
- Keep the route mobile-first and visually coherent with the existing overview layout.

## Out of scope

- Repository file browsing or file-content views.
- Live terminal sessions, custom command input, or remote execution.
- Streaming logs, log export, or interactive filtering.
- Real workflow runs, schedule controls, or deploy execution.
- New backend routes, persistence, GitHub integration, or host transport.

## Task checklist

- [x] Audit the current `/projects/[slug]` layout and choose the smallest section-navigation pattern that fits the mobile shell.
- [x] Extend shared project detail data with bounded Runtime, Logs, and Stats shell content.
- [x] Add the new shell sections and keep their copy explicit about non-live behavior.
- [x] Refine spacing and visual hierarchy so the longer detail view stays thumb-friendly on mobile.
- [x] Run the declared validation command.

## Acceptance criteria checks

- [x] The `/projects/[slug]` route exposes a mobile section navigation or jump rail for Repository, Runtime, Workflow, Deployments, Logs, and Stats.
  - Evidence: `apps/web/app/projects/[slug]/page.tsx:16-23`; `apps/web/app/projects/[slug]/page.tsx:58-70`; `apps/web/app/projects/[slug]/page.tsx:73-236`.
- [x] The detail page adds shell-only Runtime, Logs, and Stats sections using bounded data without introducing live command execution or log streaming.
  - Evidence: `apps/web/app/projects/data.ts:42-86`; `apps/web/app/projects/data.ts:129-210`; `apps/web/app/projects/data.ts:251-332`; `apps/web/app/projects/data.ts:373-454`; `apps/web/app/projects/[slug]/page.tsx:118-236`.
- [x] The route keeps the current overview information coherent on mobile and remains explicitly shell-only.
  - Evidence: `apps/web/app/projects/[slug]/page.tsx:100-266`; `apps/web/app/globals.css:503-600`.
- [x] The web app build passes.
  - Evidence: Validation section below records the successful `pnpm build:web` run from 2026-04-20.

## Validation command

`pnpm build:web`

## Validation

- Result: passed on 2026-04-20.
- Command: `pnpm build:web`
- Evidence:
  - Next.js production build completed successfully.
  - The build output retained the `/projects/[slug]` route in the app manifest.
- Supplemental check: `pnpm test` passed on 2026-04-20, including the focused project detail route test and existing deploy presentation tests.

## Completion summary

Added a compact mobile section jump rail to `/projects/[slug]`, expanded the shared project shell data with bounded Runtime, Logs, and Stats content, kept the route explicitly shell-only, added a focused route-level test for the new sections, and passed both `pnpm test` and `pnpm build:web`.

# Current Phase
Status: completed
Candidate ID: activity-feed-live-source

## Goal
Replace hard-coded recent-activity arrays with one bounded stored activity feed so Hub and project detail read an honest shared source and existing shell actions can emit visible events.

## Why this phase is next
GitHub evidence shows recent `Web CI` runs on `main` are green, with no open pull requests or open issues requiring a bounded regression fix first. In the shipped shell, `/` still renders a hard-coded recent-activity array and project detail still relies on fixture-backed `recentActivity` data, even though bounded project-save and deploy-action seams already exist. A stored activity feed is therefore the next smallest meaningful step: it improves already-visible shell surfaces, stays inside `apps/web`, fits the backlog six-file cap, and builds on existing write points without claiming live logs, background execution, or broader orchestration.

## Selection evidence
- Archive precondition check:
  - The previously completed phase was already archived before overwrite at `.opencode/plans/history/20260421T112158Z--host-heartbeat-shell-source.md`.
  - The archived file preserves the completed `host-heartbeat-shell-source` record, so overwriting `current-phase.md` does not lose durable phase history.
- GitHub evidence reviewed first:
  - Workflow: `Web CI` is active.
  - Most recent 3 completed `push` runs on `main` for `Web CI` all succeeded: `24720035044`, `24705462845`, and `24703232979`.
  - Open pull requests: none.
  - Open issues: none.
  - Recent repo activity is consistent with backlog-driven shell work (`feat(web): add bounded host heartbeat source` most recently on `main`), so no CI or repo regression outranked the next eligible backlog candidate.
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
    - `host-heartbeat-shell-source`
  - Remaining pending candidates evaluated against current repo shape:
    - `github-auth-shell-session`
    - `github-repo-picker-live-source`
    - `activity-feed-live-source`
    - `workflow-save-and-run-history`
    - `project-host-picker-shell-source`
    - `deploy-project-link-shell`
    - `workflow-run-activity-bridge`
    - `mobile-playwright-smoke`
    - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - Completed candidates listed above were excluded because their backlog status is `completed`.
  - `github-auth-shell-session` was excluded as otherwise ineligible because `/login`, `/auth/github`, `/auth/github/callback`, `apps/web/lib/github-auth.ts`, and README already show a bounded GitHub login and shell session-presence flow shipping in the repo.
  - `github-repo-picker-live-source` was excluded as otherwise ineligible because `/projects/new`, `GET /api/github/repos`, `apps/web/lib/github.ts`, `apps/web/app/projects/actions.ts`, and README already show a bounded live GitHub repository picker shipping in the repo.
  - `workflow-save-and-run-history` was excluded because it is lower priority and introduces a broader new persistence surface across Agents and project assignment rather than improving an existing shared shell surface.
  - `project-host-picker-shell-source` was excluded because it is lower priority; although the host-heartbeat seam now exists, the more immediate honesty gap is that Hub and project detail still render hard-coded activity events.
  - `deploy-project-link-shell` was excluded because it is lower priority and narrower than replacing the current hard-coded activity summaries already visible on `/` and `/projects/[slug]`.
  - `workflow-run-activity-bridge` was excluded because it depends on workflow-run persistence that does not exist yet, while the selected activity-feed phase can use already-shipped project-save and deploy-action seams.
  - `mobile-playwright-smoke` was excluded because it is cross-cutting test harness work rather than the highest-priority eligible product-shell seam.
  - `workflow-shell-truth-evals` was excluded because it is lower-priority `.opencode` hygiene work and current GitHub evidence does not show a workflow-truth regression that should preempt app-shell honesty work.
- Exact selection-order rule that picked the winner:
  - `highest_priority` after removing completed and otherwise ineligible candidates.
- Why the selected candidate won:
  - `activity-feed-live-source` is the highest-priority eligible backlog candidate (`28`).
  - It matches the current code shape: `apps/web/app/page.tsx` still defines a hard-coded Hub `activity` array, project detail still depends on fixture-backed `recentActivity`, and there is no existing `apps/web/lib/activity-store.ts` implementation.
  - It has two bounded existing emit points ready to use now: `apps/web/app/projects/actions.ts` already saves placeholder projects and `apps/web/app/api/deploy/actions/route.ts` already accepts or rejects deploy-action requests.
  - It remains single-module (`apps/web`), fits the backlog `max_files_changed: 6` constraint, keeps the shell honest about non-live behavior, and prepares later workflow/activity follow-ups to build on one stored event source instead of more static arrays.
- Expected validation command:
  - `pnpm build:web`

## Primary files
- `apps/web/app/page.tsx`
- `apps/web/app/projects/[slug]/page.tsx`
- `apps/web/app/api/deploy/actions/route.ts`
- `apps/web/app/projects/actions.ts`
- `apps/web/lib/activity-store.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk
Medium-low. The main risk is widening a bounded shell activity feed into speculative logging, background execution, or broad persistence instead of keeping it to concise operator-visible events from existing app actions.

## In scope
- Add one bounded server-owned activity store for single-user shell events.
- Read Hub recent activity from the activity store instead of a hard-coded array.
- Read project-detail recent activity from stored activity records instead of only fixture-backed arrays.
- Emit bounded activity records when a placeholder project is saved.
- Emit bounded activity records when a deploy action request is accepted.

## Out of scope
- Streaming logs, raw execution output, or a full execution-log system.
- Workflow-run persistence or workflow-triggered activity emission.
- Multi-user activity history, filtering UI, retention controls, or export.
- Live GitHub, host transport, or deploy orchestration beyond existing shell seams.

## Task checklist
- [x] Audit current hard-coded activity arrays and current emit opportunities in Hub, project detail, project create, and deploy actions.
- [x] Add `apps/web/lib/activity-store.ts` with one bounded read path and append helpers for single-user shell events.
- [x] Route Hub recent activity in `apps/web/app/page.tsx` through the stored activity feed.
- [x] Route project-detail recent activity through stored activity records without widening into logs or analytics.
- [x] Emit bounded activity records from `createPlaceholderProjectAction` and accepted deploy actions.
- [x] Run `pnpm build:web`.

## Validation command
`pnpm build:web`

## Acceptance criteria checks
- [x] Hub and project detail recent-activity sections render stored activity events rather than only hard-coded arrays.
  - Evidence: `apps/web/lib/activity-store.ts` now owns the bounded activity feed; `apps/web/app/page.tsx` renders Hub activity via `listHubActivityItems`; and `apps/web/app/projects/data.ts` replaces project `recentActivity` with `listProjectActivityItems(project.slug)` before `/projects/[slug]` renders the section.
- [x] Saving a project and accepted deploy actions emit bounded activity records.
  - Evidence: `apps/web/app/projects/actions.ts` appends bounded project-create events after `createPlaceholderProject`; `apps/web/app/api/deploy/actions/route.ts` appends a bounded accepted deploy-action event only after adapter acceptance and revalidates affected shell routes.
- [x] The feed remains single-user and shell-first without adding streaming logs yet.
  - Evidence: `apps/web/lib/activity-store.ts` uses one server-owned in-memory event list with fixture fallback plus bounded append helpers only; no streaming, raw execution log, multi-user, or background worker behavior was introduced.
- [x] The web app build passes.
  - Evidence: `pnpm build:web` completed successfully on 2026-04-21 and included the updated dynamic Hub, project detail, and deploy action route output.

## Validation

- Result: passed on 2026-04-21.
- Command: `pnpm build:web`
- Evidence:
  - Next.js built successfully with type-checking and page generation completed.
  - The build output retained the bounded deploy-action, GitHub, and host API routes while compiling the updated Hub and project-detail activity feed reads.

## Completion summary

Added a bounded server-owned activity store with fixture fallback, then routed Hub and project-detail recent activity through that shared source instead of hard-coded arrays. The shell now records bounded project-create and accepted deploy-action events for the single user without claiming streaming logs, workflow execution, or live deploy control.

- README_CHECK: `README_REQUIRED`
- README_REASON: The phase changed visible Hub and project-detail behavior and introduced a bounded stored activity source that affects shipped runtime truth in README.

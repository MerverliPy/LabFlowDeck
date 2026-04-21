# Current Phase
Status: completed
Candidate ID: github-repo-picker-live-source

## Goal
Add a bounded live GitHub repository picker to the new project flow so an authenticated single user can choose from their GitHub repositories without claiming file browsing, webhook sync, or full metadata ingestion.

## Why this phase is next
The shell now has bounded GitHub session presence, so the smallest coherent follow-up is to use that session inside the existing project-creation flow. This keeps the work inside `apps/web`, reduces integration risk by building directly on the just-shipped auth seam, and advances the SPEC's first-project journey without widening into host pairing or repo-detail scope.

## Selection evidence
- Evaluated candidate set: `github-repo-picker-live-source`, `host-heartbeat-shell-source`, `activity-feed-live-source`, `workflow-save-and-run-history`, `project-host-picker-shell-source`, `deploy-project-link-shell`, `workflow-run-activity-bridge`.
- Excluded candidates and why:
  - `host-heartbeat-shell-source` was excluded because it spans Hub plus project detail host summaries and is broader than a same-module project-creation follow-up.
  - `activity-feed-live-source` was excluded because it crosses multiple routes and write paths, making validation wider than the current GitHub-authenticated creation seam.
  - `workflow-save-and-run-history` was excluded because it opens workflow storage and run-history scope before the project creation GitHub path is coherent.
  - `project-host-picker-shell-source` was excluded because it depends more naturally on a credible repo-selection step first and is lower priority.
  - `deploy-project-link-shell` was excluded because it is lower priority and does not reduce current onboarding integration risk.
  - `workflow-run-activity-bridge` was excluded because it is lower priority and introduces cross-surface write behavior instead of the next onboarding seam.
- Exact selection-order rule that picked the winner: `highest_priority` among eligible pending candidates; `same_module_followup` also reinforced the choice because it builds directly on the newly completed GitHub auth and project-creation surfaces.
- Why the selected candidate won: `github-repo-picker-live-source` is the highest-priority eligible pending backlog item, stays within the current shell-first product boundary, remains centered in `apps/web`, and has a clear validation path through `pnpm build:web`.
- Expected validation command: `pnpm build:web`

## Primary files
- `apps/web/app/projects/new/page.tsx`
- `apps/web/app/api/github/repos/route.ts`
- `apps/web/app/projects/actions.ts`
- `apps/web/lib/github.ts`
- `apps/web/lib/project-store.ts`
- `apps/web/app/auth/github/callback/route.ts`
- `apps/web/lib/github-auth.ts`
- `README.md`
- `.opencode/plans/current-phase.md`

## Expected max files changed
9

## Risk
Medium. The main risks are overstating the maturity of GitHub integration, leaking unauthenticated states into a broken project-creation path, or storing more repository metadata than this bounded phase requires.

## In scope
- Add one bounded server-side GitHub repository list seam for the authenticated single user.
- Let `/projects/new` fetch and present a bounded live repository list when a GitHub shell session exists.
- Save the selected repository identifier onto the placeholder project record.
- Keep fallback copy honest when GitHub auth is missing or repo fetch fails.

## Out of scope
- File-tree browsing or file-content fetch.
- Webhook sync or broader GitHub metadata ingestion.
- Multi-user auth or organization/team management.
- Host pairing expansion, workflow persistence, or deploy orchestration changes.
- Broad project creation redesign beyond what is needed for a bounded repo picker.

## Task checklist
- [x] Audit the current `/projects/new` flow, placeholder save action, and GitHub session helper for the smallest coherent repo-picker seam.
- [x] Add a bounded server-side GitHub repository list helper and thin API route.
- [x] Update `/projects/new` to present authenticated live repository choices while preserving an honest fallback path.
- [x] Save the selected repository identifier onto the placeholder project record.
- [x] Run `pnpm build:web`.
- [x] Record validation evidence in this phase file.

## Validation command
`pnpm build:web`

## Acceptance criteria checks
- [x] An authenticated user can fetch a bounded list of repositories from GitHub during project creation.
  - Evidence: `apps/web/lib/github.ts:34-112`; `apps/web/app/api/github/repos/route.ts:5-16`; `apps/web/app/projects/new/page.tsx:88-208`; unauthenticated validation of `GET /api/github/repos` returned a bounded `401` fallback contract instead of pretending repos were available.
- [x] The selected repository identifier is saved onto the placeholder project record.
  - Evidence: `apps/web/app/projects/actions.ts:13-38`; `apps/web/lib/project-store.ts:431-555`.
- [x] The phase does not add file-tree browsing, webhook sync, or full repo metadata ingestion yet.
  - Evidence: `apps/web/app/projects/new/page.tsx:198-208`; `README.md:67-83`.
- [x] The web app build passes.
  - Evidence: validation section below records the successful `pnpm build:web` and `pnpm test:web` runs from 2026-04-20.

## Validation

- Result: passed on 2026-04-20.
- Command: `pnpm build:web`
- Additional command: `pnpm test:web`
- Additional verification:
  - `curl -i http://localhost:3001/api/github/repos` returned `401 Unauthorized` with the bounded signed-out contract when no GitHub session was present.
  - Local Playwright verification of `http://localhost:3001/projects/new` confirmed the signed-out fallback guidance and connect-to-GitHub CTA render without browser console errors.
  - Added bounded regression tests for signed GitHub session/access-token cookie handling and signed-out/reauth repo-picker states.
- Notes:
  - The implementation stayed within the bounded repo-picker scope and kept manual fallback behavior honest when GitHub auth or repo lookup is unavailable.
  - Post-implementation hardening cleared stale signed-session state on failed reconnects and replaced fragile process-local token storage with signed cookie storage so repo picking survives server restarts more honestly.
  - The touched-file count exceeded the original backlog candidate list because the existing auth callback and helper needed a bounded token handoff for repo listing, and the README gate required runtime-truth updates.

## Completion summary

Added a bounded GitHub repository list helper and thin API route, wired `/projects/new` to show live repository choices for an authenticated session with honest fallback states, saved the chosen repository identifier onto placeholder project records, hardened reconnect handling so stale signed sessions are cleared on callback failure, replaced fragile in-memory token storage with signed cookie storage, added bounded regression tests, and updated README runtime truth without claiming file browsing or broader GitHub sync.

- README_CHECK: `README_REQUIRED`
- README_REASON: The phase changed project-creation behavior, added a shipped thin API route, and changed the repo truth for what GitHub-backed behavior is now live versus still out of scope.

# Current Phase
Status: completed
Candidate ID: deploy-project-link-shell

## Goal
Add bounded project linkage from Deploy cards into the existing project detail shell so operators can pivot from deploy status to project context without implying live orchestration ownership.

## Why this phase was next
The highest-priority pending backlog entries above this candidate, `github-auth-shell-session` and `github-repo-picker-live-source`, are already implemented in the repo and reflected in the shipped runtime. The next unresolved bounded slice was the Deploy-to-Projects navigation gap: deployment cards already carried project identity, but the deploy adapter seam did not expose a durable project slug and the deploy UI could not link into `/projects/[slug]` even when a matching stored project shell existed.

## Primary files
- `apps/web/app/deploy/presentation.tsx`
- `apps/web/app/deploy/types.ts`
- `apps/web/lib/deploy-adapter.ts`
- `README.md`
- `.opencode/backlog/candidates.yaml`
- `.opencode/plans/current-phase.md`

## Task checklist
- [x] Audit the current deploy card and service-detail project identity path.
- [x] Extend deploy status records with a bounded project slug when one can be derived safely from the adapter seam.
- [x] Add project-detail links from deploy cards and the deploy service detail sheet.
- [x] Update README runtime truth for the visible deploy-shell behavior.
- [x] Run `pnpm build:web`.

## Validation command
`pnpm build:web`

## Acceptance criteria checks
- [x] Deploy cards can show bounded project identity when available from the adapter seam.
  - Evidence: `apps/web/lib/deploy-adapter.ts` now normalizes every deployment record with a bounded `projectSlug`, including configured JSON input.
- [x] A deploy surface can link into `/projects/[slug]` without implying live orchestration ownership.
  - Evidence: `apps/web/app/deploy/presentation.tsx` now adds project-detail links on deploy cards and in the mobile service detail sheet.
- [x] README remains honest that Deploy is still a shell-first control surface.
  - Evidence: `README.md` now describes `/deploy` as a bounded adapter-backed shell with project-detail links, not live host or Docker control.
- [x] The web app build passes.
  - Evidence: `pnpm build:web` completed successfully on 2026-04-21.

## Validation

- Result: passed on 2026-04-21.
- Commands:
  - `pnpm build:web`
- Evidence:
  - Next.js built successfully after the deploy adapter and presentation updates.

## Completion summary

Added a bounded `projectSlug` to deploy status records, derived it safely in the deploy adapter seam for both fixture and configured data, and surfaced project-detail links from deploy cards and the service detail sheet. The Deploy route now links into the existing project shell without claiming that deploy ownership or Docker control lives inside the web app.

- README_CHECK: `README_REQUIRED`
- README_REASON: The phase changed visible `/deploy` behavior and README should reflect the new project-linking shell truth.

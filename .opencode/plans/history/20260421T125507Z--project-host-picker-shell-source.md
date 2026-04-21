# Current Phase
Status: completed
Candidate ID: project-host-picker-shell-source

## Goal
Replace the hard-coded host choices in the new project flow with a bounded stored host list so project creation can select from real shell heartbeat records without claiming live host pairing or SSH control.

## Why this phase was next
GitHub evidence still showed recent `Web CI` runs on `main` were green, with no open pull requests or open issues requiring a bounded regression fix first. After the workflow-save phase, the highest-priority eligible remaining backlog work was the host-selection honesty gap in `/projects/new`: the route still rendered a hard-coded `hosts` array, there was no `apps/web/app/api/hosts/list/route.ts`, `apps/web/app/projects/actions.ts` still normalized incoming host choice to fixed presets, and `apps/web/lib/host-store.ts` already exposed bounded stored heartbeat summaries that the project-create shell could safely reuse.

## Primary files
- `README.md`
- `apps/web/app/projects/new/page.tsx`
- `apps/web/app/api/hosts/list/route.ts`
- `apps/web/app/projects/actions.ts`
- `apps/web/lib/project-store.ts`
- `.opencode/backlog/candidates.yaml`
- `.opencode/plans/current-phase.md`

## Task checklist
- [x] Audit the current hard-coded host picker path in `/projects/new`, `projects/actions.ts`, `project-store.ts`, and `host-store.ts`.
- [x] Add `apps/web/app/api/hosts/list/route.ts` backed by the bounded stored heartbeat source.
- [x] Replace the hard-coded host options in `/projects/new` with stored host list data and honest empty/degraded states.
- [x] Validate and persist the selected stored host in the project-create action and placeholder project store.
- [x] Run `pnpm build:web`.

## Validation command
`pnpm build:web`

## Acceptance criteria checks
- [x] The new project flow can fetch and present a bounded list of stored hosts for single-user selection.
  - Evidence: `apps/web/app/projects/new/page.tsx` now reads `listHostHeartbeats()`, renders stored host cards with heartbeat and latency summaries, and shows a bounded empty-state message instead of hard-coded host presets.
- [x] The selected host identifier is saved onto the placeholder project record.
  - Evidence: `apps/web/app/projects/actions.ts` validates the submitted host ID against the stored heartbeat list and `apps/web/lib/project-store.ts` now saves the selected stored host details onto the placeholder project shell.
- [x] The phase does not add SSH execution, agent installation, or multi-host orchestration yet.
  - Evidence: the new thin route `apps/web/app/api/hosts/list/route.ts` only returns stored host records from the heartbeat seam, while `/projects/new` and the project store continue to present shell-only setup state.
- [x] The web app build passes.
  - Evidence: `pnpm build:web` completed successfully on 2026-04-21 and generated `/api/hosts/list` plus the updated `/projects/new` route.

## Validation

- Result: passed on 2026-04-21.
- Commands:
  - `pnpm build:web`
- Evidence:
  - Next.js built successfully with the updated project-create route, new host-list API route, and project-store host-selection path.

## Completion summary

Replaced the `/projects/new` host step's hard-coded choices with bounded stored heartbeat records, added a thin `/api/hosts/list` route, validated selected host IDs in the server action, and saved the selected stored host details into the placeholder project record. The shipped shell now presents host selection more honestly without claiming live host pairing, SSH transport, or deploy control.

- README_CHECK: `README_REQUIRED`
- README_REASON: The phase changed visible `/projects/new` behavior and added a new thin API route that affects shipped runtime truth.

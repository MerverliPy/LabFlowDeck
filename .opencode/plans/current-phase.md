# Current Phase

Status: completed

Candidate ID: decompose-deploy-client-surface

## Goal

Reduce integration risk in the Deploy surface by splitting the oversized client route into smaller view and helper modules while keeping the existing mobile shell behavior unchanged.

## Why this phase is next

The `.opencode` state is now reconciled and the founder credibility fixes are complete, so the next safe move is a bounded same-module follow-up in `apps/web`. The Deploy route is the only interactive control-plane surface and currently concentrates filtering, formatting, confirmation, fetch, and rendering concerns in a single large client file. Splitting that module now reduces risk before more Deploy behavior is added, keeps scope within one feature area, and still has a clear build-based validation path.

## Primary files

- apps/web/app/deploy/DeployPageClient.tsx
- apps/web/app/deploy/presentation.tsx
- apps/web/app/deploy/format.ts
- apps/web/app/deploy/filters.ts
- apps/web/app/deploy/types.ts
- .opencode/plans/current-phase.md

## Expected max files changed

6

## Risk

Low to medium. This is a contained refactor inside one route module, with the main risk being accidental behavior drift in the existing filter and action flows while code is being decomposed.

## In scope

- Split inline Deploy helper logic into small module-local helpers and/or presentation units.
- Keep current deploy filters, action confirmation flow, and API request behavior intact.
- Preserve the current mobile-first shell copy and visual structure.
- Document the phase plan and validation path in this file.

## Out of scope

- Adding new deploy actions, backend orchestration, persistence, or live Docker control.
- Expanding into auth, host pairing, streaming logs, or new product routes.
- Redesigning the Deploy shell or changing its existing API contracts.

## Tasks

- Audit `apps/web/app/deploy/DeployPageClient.tsx` and identify extraction seams that preserve current behavior.
- Move badge, format, filter, and action-label helpers out of the main client file.
- Extract one or more Deploy presentation units so the page becomes easier to scan and maintain.
- Verify the refactor preserves the current route contract and build health.

## Validation command

pnpm build:web

## Acceptance criteria

- The Deploy route keeps its existing shell behavior and thin API contract.
- Inline badge, filter, and action-label helpers no longer live in the main client file.
- The primary Deploy client file is materially smaller and easier to audit.
- The web app build passes after the refactor.

## Validation

passed — `pnpm build:web`

## Completion summary

Refactored the Deploy surface into bounded module-local helpers and presentation components without changing the route contract. `DeployPageClient.tsx` now focuses on state and API flow only, shrinking from 489 lines to 165 while extracted `format.ts`, `filters.ts`, and `presentation.tsx` hold display and filtering logic.

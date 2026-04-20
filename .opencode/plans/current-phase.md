# Current Phase

Status: completed

Candidate ID: deploy-service-detail-sheet

## Goal

Add a focused mobile service detail sheet inside the Deploy route so each tracked service can be inspected and acted on without leaving the control-plane shell.

## Why this phase is next

The recent Deploy refactor reduced structure risk and left the route in a good state for one bounded same-module follow-up. `SPEC.md` calls for tapping a service to inspect detailed status, recent logs, preview URLs, and safe actions, while the current route only shows condensed service rows inline. This phase is the smallest meaningful next slice because it deepens the most mature interactive surface, stays within one module, and has a clear build-based validation path.

## Primary files

- apps/web/app/deploy/DeployPageClient.tsx
- apps/web/app/deploy/presentation.tsx
- apps/web/app/deploy/types.ts
- apps/web/app/deploy/format.ts
- .opencode/plans/current-phase.md

## Expected max files changed

5

## Risk

Low to medium. The work stays inside one existing route, with the main risk being state or interaction drift between the existing action-confirmation flow and the new service detail surface.

## In scope

- Add a mobile-first service detail sheet, drawer, or inline expansion within `/deploy`.
- Allow selecting a service from the existing deployment list.
- Show focused service details: runtime, health, resource usage, recent log preview, preview URL, and ports when available.
- Reuse the existing confirmation-gated action flow from the new detail surface.
- Preserve the current thin deploy API contract and shell-level routing.

## Out of scope

- New backend orchestration, polling models, or live Docker integration.
- Full log streaming, service history pages, or separate nested deploy routes.
- Changes to project, agents, or hub modules.
- Auth, persistence, host pairing, or multi-user behavior.

## Tasks

- Audit the current deploy presentation seams and choose the smallest service-selection pattern that fits the mobile layout.
- Add service selection state to the Deploy client and wire it to existing service rows.
- Build a focused service detail surface in `presentation.tsx` using the current service data model.
- Route existing service actions through the detail surface while preserving the current confirmation sheet behavior.
- Verify the route still builds cleanly and remains coherent on mobile.

## Validation command

pnpm build:web

## Acceptance criteria

- Tapping a service opens a focused mobile detail surface within the existing Deploy route.
- The detail surface shows runtime status, health status, resource usage, recent log preview, and preview URL or ports when present.
- Existing confirmation-gated service actions still work from the detail surface without changing the thin API contract.
- The Deploy route remains mobile-first and the web app build passes.

## Validation

passed — `pnpm build:web`

## Completion summary

Added a service detail sheet to the Deploy route, wired service-row taps to selection state in `DeployPageClient.tsx`, and moved restart/stop service actions into the focused detail surface while preserving the existing confirmation sheet and thin API adapter contract.

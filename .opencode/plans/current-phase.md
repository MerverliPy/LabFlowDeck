# Current Phase

Status: completed
Candidate ID: deploy-control-plane-slice

## Goal

Turn the Deploy shell into a bounded control-plane slice with a thin status API, persisted filters, confirmation flows, and a deploy action contract that stops at a safe adapter boundary.

## Why this phase is next

This was explicit user scope following the completed Deploy shell. It keeps the work inside `apps/web`, adds the first real client/server deploy path, and avoids premature full Docker orchestration by using a thin adapter seam.

## Primary files

- apps/web/app/deploy/page.tsx
- apps/web/app/deploy/DeployPageClient.tsx
- apps/web/app/deploy/data.ts
- apps/web/app/deploy/types.ts
- apps/web/app/api/deploy/status/route.ts
- apps/web/app/api/deploy/actions/route.ts
- apps/web/app/globals.css

## Expected max files changed

8

## Risk

Medium. This is still frontend-heavy, but it introduces client interactivity, query-param persistence, and thin API contracts that needed careful scope control.

## In scope

- Add a thin deploy status route and shared typed data contract
- Replace the static Deploy page with a client/server control-plane slice using fetched status data
- Add persisted project and status filters using URL query params
- Add confirmation flows for deploy, rebuild, restart, and stop actions
- Add a thin action route backed by a bounded adapter seam
- Add only the shared styling needed for the new Deploy controls

## Out of scope

- Real Docker or Compose execution
- SSH or host-agent transport
- Durable job execution or retries
- Streaming logs or background polling loops
- Persisted deployment history or server-side filter storage

## Tasks

- Add `apps/web/app/deploy/types.ts` and `apps/web/app/deploy/data.ts` for the typed deploy contract and safe adapter seam
- Add `GET /api/deploy/status` and `POST /api/deploy/actions`
- Convert `/deploy` to render a client control-plane component with manual refresh and URL-persisted filters
- Add confirmation UI and action submission states for deployment and service actions
- Extend shared CSS only as needed for filter chips, action rows, feedback cards, and the confirmation sheet

## Validation command

pnpm build:web

## Validation

passed — `pnpm build:web`

## Acceptance criteria

- `/deploy` renders from a shared typed deploy status contract instead of only in-file static markup
- The page exposes persisted project/status filters and manual refresh
- Deploy, rebuild, restart, and stop all require confirmation before submitting through the action contract
- Thin deploy status and action API routes exist and build successfully
- The implementation remains within `apps/web` and avoids full backend orchestration
- `pnpm build:web` passes

## Completion summary

The Deploy surface now uses a typed control-plane slice with a thin status API, a thin action API, URL-persisted filters, manual refresh, and confirmation-driven deploy actions. A bounded adapter seam was added to keep the implementation honest about not executing real Docker control yet, and the web app build passed after the change.

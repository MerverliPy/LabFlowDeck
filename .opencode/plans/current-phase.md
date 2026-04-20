# Current Phase

Status: completed

Candidate ID: web-health-route

## Goal

Add lightweight build metadata to the web health endpoint so operators can confirm which LabFlowDeck shell build is running without expanding backend scope.

## Why this phase is next

The repo-state brief showed there is no active PR or CI context to continue from, so the safest next move is a small, auditable phase from the backlog. Current code shape shows the Hub, Projects, Agents, Deploy shell, screens caveats, and a thin health route already exist; the remaining bounded gap in the backlog is that `GET /api/health` does not yet expose build metadata promised by the candidate. This keeps scope to one module, aligns with the SPEC's control-plane monitoring needs, and has the clearest validation path.

## Primary files

- apps/web/app/api/health/route.ts
- .opencode/plans/current-phase.md

## Expected max files changed

2

## Risk

Low. This is a thin route-only change, with the main risk being exposing unstable or misleading metadata fields instead of simple, deterministic operator-facing values.

## In scope

- Extend `GET /api/health` with lightweight build/runtime metadata.
- Keep the payload safe, static, and easy to inspect from an operator health check.
- Document the phase and validation evidence in this phase file.

## Out of scope

- Adding authentication, persistence, or host-aware health checks.
- Wiring the health route to external services, databases, or GitHub APIs.
- Expanding deploy APIs or changing primary shell UI routes.

## Tasks

- Audit the current `apps/web/app/api/health/route.ts` payload against the backlog acceptance language.
- Add bounded build metadata such as version/build identifier fields that can be derived safely at runtime.
- Keep the response shape small and operator-readable.
- Run the web build to verify the route still compiles cleanly.

## Validation command

pnpm build:web

## Acceptance criteria

- `GET /api/health` returns `ok` status plus lightweight build metadata.
- The route remains a thin app-surface contract with no new backend dependencies.
- The web app build passes after the route update.

## Validation

passed — `pnpm build:web`

## Completion summary

Extended the thin web health route with compact operator-facing build metadata: app version from `apps/web/package.json`, a short commit identifier when deployment metadata is available, and the current runtime environment, while keeping the response bounded to the existing app shell.

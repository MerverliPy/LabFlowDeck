# Current Phase

Status: completed
Candidate ID: projects-create-flow-path

## Goal

Wire the Projects create-project CTA into a small guided mobile-first flow so the shell has a meaningful next step before live repository integration.

## Why this phase is next

This is explicit user scope, stays inside the existing `apps/web` Projects module, and reduces integration risk by giving the CTA a real destination before deeper backend or GitHub work begins.

## Primary files

- apps/web/app/projects/page.tsx
- apps/web/app/projects/new/page.tsx
- apps/web/app/globals.css

## Expected max files changed

4

## Risk

Low. This is a bounded frontend-only follow-up that adds a static guided path without expanding backend scope.

## In scope

- Link the existing create-project CTA to a dedicated route
- Add a lightweight guided create-project screen aligned to the Projects flow in `SPEC.md`
- Show placeholder steps for repo selection, host selection, service confirmation, and optional workflow attachment
- Add only the shared styling needed for the new route

## Out of scope

- Real GitHub repository browsing or authentication
- Persisting created projects
- Host-backed creation logic or service discovery
- Project detail routing or broader navigation refactors

## Tasks

- Update the Projects CTA to navigate to a guided create flow
- Add `apps/web/app/projects/new/page.tsx` with a small four-step placeholder flow
- Extend `apps/web/app/globals.css` for flow cards, step list, selection cards, and CTA styling

## Validation command

pnpm build:web

## Validation

passed — `pnpm build:web`

## Acceptance criteria

- The create-project CTA from `/projects` navigates to a dedicated guided path
- The new path presents a coherent mobile-first create flow shell with the main steps from `SPEC.md`
- The implementation remains frontend-only and does not introduce speculative backend behavior
- `pnpm build:web` passes

## Completion summary

The Projects CTA now routes to `/projects/new`, where a lightweight mobile-first guided flow presents placeholder steps for project naming, repo selection, host selection, service confirmation, and optional workflow attachment. Shared styling was added only for this route and its actions, and the web app build passed after the change.

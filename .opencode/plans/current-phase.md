# Current Phase

Status: completed
Candidate ID: agents-create-flow-path

## Goal

Wire the Agents create-workflow CTA into a small guided mobile-first flow so the workflow panel has a meaningful next step before editor and backend integration work begins.

## Why this phase is next

This was explicit user scope and the clearest follow-up to the completed Agents panel shell. It stays fully inside the existing `apps/web` Agents module, reduces UX dead ends, and avoids speculative backend expansion.

## Primary files

- apps/web/app/agents/page.tsx
- apps/web/app/agents/new/page.tsx
- apps/web/app/globals.css

## Expected max files changed

4

## Risk

Low. This is a bounded frontend-only follow-up that adds a static guided workflow-creation path without introducing persistence or execution logic.

## In scope

- Ensure the existing create-workflow CTA leads to a dedicated route
- Add a lightweight guided workflow-creation screen aligned to the workflow-management path in `SPEC.md`
- Show placeholder steps for template choice, step review, schedule selection, and project assignment
- Add only the shared styling needed for the new route

## Out of scope

- Workflow editor implementation or step editing
- Real scheduling, execution, or live log streaming
- Workflow persistence or project assignment storage
- Cross-route refactors beyond small shared style reuse

## Tasks

- Back the existing create-workflow CTA with a dedicated `/agents/new` route
- Add `apps/web/app/agents/new/page.tsx` with a small guided flow shell
- Reuse or extend shared mobile-first styles only as needed for the new route

## Validation command

pnpm build:web

## Validation

passed — `pnpm build:web`

## Acceptance criteria

- The create-workflow CTA from `/agents` navigates to a dedicated guided path
- The new path presents a coherent mobile-first create flow shell with the main steps implied by `SPEC.md`
- The implementation remains frontend-only and avoids speculative backend behavior
- `pnpm build:web` passes

## Completion summary

The Agents CTA now leads to `/agents/new`, where a lightweight mobile-first workflow-creation shell shows template selection, pre-populated step review, optional scheduling, and project assignment placeholders. The fix removes the dead-end CTA risk, keeps the implementation bounded to the frontend shell, and passes the web app build.

# Current Phase

Status: completed

## Goal

Stabilize the mobile shell navigation so the fixed bottom nav stays tappable and no longer overlaps primary content on the Hub, Projects, and Agents screens.

## Why this phase is next

The latest browser audit found a core mobile usability issue: the bottom nav can overlap content and, at small viewport sizes, even interfere with basic tab switching. This is the clearest same-module follow-up to the existing shell work, directly supports the SPEC's mobile-first direction, and has a small, practical validation surface.

## Primary files

- apps/web/app/globals.css
- apps/web/app/page.tsx
- apps/web/app/projects/page.tsx
- apps/web/app/agents/page.tsx

## Expected max files changed

4

## Risk

Low. The change is presentation-focused, but shared shell CSS touches multiple primary routes, so spacing regressions across the mobile shell are the main risk.

## In scope

- Reserve reliable bottom safe-area space for the fixed nav on mobile screens.
- Ensure the nav stays visually above page content and remains easy to tap.
- Apply any small route markup adjustments needed on Hub, Projects, and Agents to support the shared shell fix.

## Out of scope

- Wiring the Hub quick-action buttons to real behavior.
- Adding route-specific metadata titles or favicon assets.
- Reworking the Deploy page interaction model.
- Broad desktop-layout refactors or shared-component extraction.

## Tasks

- Audit the shared shell spacing and bottom-nav positioning rules in `apps/web/app/globals.css`.
- Adjust shell padding, safe-area handling, and nav layering for mobile viewports.
- Make the smallest route-level markup updates needed on Hub, Projects, and Agents.
- Re-check that content is not obscured by the fixed nav across the affected routes.

## Validation command

pnpm build:web

## Acceptance criteria

- Hub, Projects, and Agents reserve enough bottom space that card content is not hidden behind the fixed nav on mobile.
- The bottom nav remains visible and tappable across those screens at mobile widths.
- The change stays bounded to the existing `apps/web` shell surface and does not introduce new backend behavior.

## Validation

passed — `pnpm build:web`
passed — Playwright mobile verification confirmed the fixed bottom nav remained tappable and left visible clearance above the last card on `/`, `/projects`, `/agents`, and `/deploy`

## Completion summary

Adjusted the shared mobile shell spacing so the fixed bottom nav no longer covers end-of-page content, and disabled the unstable Next dev segment explorer so local runtime validation remains reliable.

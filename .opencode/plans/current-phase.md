# Current Phase

Status: completed

Candidate ID: explicit-user-scope-deploy-detail-sheet-scrollbar-polish

## Goal

Reduce the visual weight of the Deploy detail-sheet internal scrollbar on mobile while preserving the improved sheet separation, internal scroll ownership, and reachable footer actions.

## Why this phase is next

The user explicitly asked to execute the recommended sequence in order. After the UI batch was made merge-ready and the guided Projects flow gained placeholder persistence, the next smallest safe follow-up was a CSS-only polish pass on the remaining visible Deploy sheet scrollbar issue.

## Primary files

- `apps/web/app/globals.css`
- `.opencode/plans/current-phase.md`

## Expected max files changed

2

## Risk

Low. The main risk is making the scroller too subtle and reducing overflow discoverability.

## In scope

- Light scrollbar polish for the Deploy service detail-sheet body on mobile.
- Preserve the current sheet structure, scroll ownership, and action behavior.
- Keep the change CSS-only and tightly bounded.

## Out of scope

- Further structural changes to the Deploy sheet.
- Changes to the Projects placeholder persistence flow.
- Backend contract changes or action-flow changes.
- Any new route additions.

## Tasks

- [x] Inspect the remaining Deploy detail-sheet scrollbar issue after the prior mobile layout pass.
- [x] Add a bounded CSS-only scrollbar polish to the detail-sheet body.
- [x] Run `pnpm build:web`.
- [x] Verify the Deploy detail sheet in Playwright on a mobile viewport and note any remaining visible regressions.

## Validation command

`pnpm build:web`

## Acceptance criteria

- The Deploy detail-sheet internal scrollbar is less visually harsh on mobile.
- The sheet keeps its internal scroll behavior and reachable footer actions.
- The web app build passes.

## Acceptance criteria checks

- [x] The Deploy detail-sheet internal scrollbar is less visually harsh on mobile.
  - Evidence: `apps/web/app/globals.css:494-520`; Playwright screenshot on `http://127.0.0.1:3009/deploy` showed a thinner, lower-contrast internal scrollbar with preserved spacing from the content.
- [x] The sheet keeps its internal scroll behavior and reachable footer actions.
  - Evidence: Playwright evaluation on `http://127.0.0.1:3009/deploy` reported `.deployServiceSheetBody` with `overflowY: auto`, `scrollbarWidth: thin`, `paddingRight: 4px`, `bodyClientHeight: 194`, and `bodyScrollHeight: 495`; `Restart service` remained visible and still opened the confirmation dialog.
- [x] The web app build passes.
  - Evidence: `pnpm build:web` passed on 2026-04-21.

## Validation

- Result: passed on 2026-04-21.
- Command: `pnpm build:web`
- Browser verification:
  - Opened `http://127.0.0.1:3009/deploy` at `390x844` in Playwright.
  - Opened the `web` service detail sheet and confirmed the internal scrollbar rendered with thinner styling and extra right padding.
  - Confirmed the detail sheet still scrolled internally and `Restart service` still opened the confirmation dialog.
  - No new console errors were produced on the `3009` route load.
  - Remaining visible regression: the detail sheet still needs the internal scrollbar because the content is longer than the available mobile viewport, but it is now less visually distracting.

## Completion summary

Applied a small CSS-only scrollbar polish to the Deploy service detail sheet, kept the internal scroll region and footer actions intact, and verified the result in Playwright after a successful web build.

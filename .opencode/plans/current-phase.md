# Current Phase

Status: ready
Candidate ID: publish-runtime-truth-readme

## Goal

Add a current implemented surfaces section and honest runtime limitations to README so the repo stops overstating shipped product maturity.

## Why this phase is next

`reconcile-opencode-phase-state` is now completed, so it must no longer remain the active candidate. The founder priority queue places `publish-runtime-truth-readme` next, and it is the next bounded credibility fix before any more product-surface work continues.

## Primary files

- README.md
- .opencode/plans/current-phase.md

## Expected max files changed

2

## Risk

Low. This is bounded documentation work, but inaccurate wording could still overstate what the runtime actually ships today.

## In scope

- Audit the currently shipped `apps/web` runtime routes and thin API surfaces before editing README claims.
- Add a durable README section for current implemented surfaces.
- Separate implemented runtime surfaces from placeholder flows and future integrations.
- Explicitly note the absence of auth, host pairing, and persistence if they are still not implemented.

## Out of scope

- New product routes or UI shell expansion.
- Auth, host pairing, persistence, or backend orchestration implementation.
- Screens/design-reference labeling work.
- Any dependency, lockfile, or runtime-behavior changes.

## Tasks

- Audit all currently shipped routes in `apps/web/app` and thin API routes under `apps/web/app/api`.
- Update README with a `Current implemented surfaces` section that only lists confirmed runtime surfaces.
- Add a `Not implemented yet` section that clearly separates placeholder UI flows from future integrations.
- Re-read README after editing to ensure no wording claims auth, host pairing, persistence, or deeper backend execution already exist.

## Validation command

grep -n "Current implemented surfaces" README.md
grep -n "Not implemented yet" README.md

## Acceptance criteria

- README lists only shipped runtime routes and thin API routes as implemented.
- README explicitly separates implemented surfaces, placeholder flows, and future integrations.
- README explicitly notes lack of auth, host pairing, and persistence if those are still not implemented.

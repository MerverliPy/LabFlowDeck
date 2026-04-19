# Current Phase

Status: completed
Candidate ID: classify-screen-exports-reference

## Goal

Mark the `screens/` exports as design-reference artifacts so the repo clearly distinguishes visual source material from the actual shipped `apps/web` runtime.

## Why this phase is next

`publish-runtime-truth-readme` is effectively complete and should no longer block the next founder-priority credibility fix. The next highest-priority eligible candidate is `classify-screen-exports-reference`, and it is still bounded, low-risk, and tightly aligned with the just-finished README truthfulness work.

## Primary files

- screens/README.md
- README.md
- .opencode/plans/current-phase.md

## Expected max files changed

3

## Risk

Low. This is documentation-only work, but unclear wording could still imply that the exported screen files are feature-complete runtime routes rather than reference artifacts.

## In scope

- Add a `screens/README.md` that explains the folder contains design-reference exports.
- Cross-link the `screens/` folder from the main README with the same caveat.
- Reword any nearby documentation that could imply parity between `screens/` exports and `apps/web` runtime surfaces.

## Out of scope

- Converting `screens/` exports into runnable routes.
- Adding new product features or expanding the web shell.
- Refactoring the exported screen files themselves.
- Backend, auth, host pairing, persistence, or orchestration work.

## Tasks

- Audit the `screens/` directory and current README wording for maturity claims.
- Create `screens/README.md` describing the exports as design-reference artifacts, not shipped runtime routes.
- Update the root README to reference `screens/` with the same caveat.
- Re-read both documents to ensure they clearly separate design references from implemented `apps/web` surfaces.

## Validation command

grep -n "design-reference" screens/README.md
grep -n "screens/" README.md

## Validation

passed — `grep -n "design-reference" screens/README.md` matched the design-reference wording in `screens/README.md`
passed — `grep -n "screens/" README.md` matched the new `screens/` caveat in the root README

## Acceptance criteria

- `screens/README.md` states that screens exports are design-reference artifacts, not runtime routes.
- README cross-links to `screens/` with the same caveat.
- Wording no longer implies parity between screens exports and `apps/web` runtime implementation.

## Completion summary

Added a dedicated `screens/README.md` that classifies the exported screen files as design-reference artifacts and updated the root README to cross-link that folder with matching caveats so design exports no longer overstate shipped runtime maturity.

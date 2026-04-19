# Current Phase

Status: completed
Candidate ID: reconcile-opencode-phase-state

## Goal

Reconcile backlog, current-phase, and command-state so the OpenCode workflow is auditable again and no completed candidate remains as the active phase.

## Why this phase is next

`patch-nextjs-security-line` is already completed, so it must be ignored for next-phase selection. The founder priority queue explicitly places `reconcile-opencode-phase-state` next, and it is the smallest high-priority change that restores workflow trust before more docs or product-surface work continues.

## Primary files

- .opencode/backlog/candidates.yaml
- .opencode/plans/current-phase.md
- .opencode/plans/founder-priority-fixes.md
- .opencode/commands/phase-status.md
- .opencode/commands/priority-fixes.md

## Expected max files changed

5

## Risk

Low. This is bounded governance/documentation work, but mistakes could leave backlog and active-phase state out of sync.

## In scope

- Mark or otherwise reconcile completed founder-priority candidates in durable workflow files.
- Ensure the active candidate selected by workflow commands exists in backlog candidates.
- Keep the founder priority order explicit in one durable roadmap file.
- Make the phase-status command check for backlog/current-phase alignment.
- Remove stale active-phase references caused by already completed work.

## Out of scope

- New product routes or UI shell expansion.
- Auth, host pairing, persistence, or backend orchestration.
- README runtime-truth edits beyond what is strictly required for phase-state reconciliation.
- Screens/design-reference labeling work.

## Tasks

- Review founder-priority files and identify where completed-phase drift still exists.
- Update backlog candidate state or surrounding guidance so completed candidates are no longer treated as active next-phase options.
- Rewrite `current-phase.md` to point at the correct unresolved candidate.
- Tighten command guidance so `/phase-status` and priority-fix flow explicitly verify alignment.
- Re-check that all referenced candidate IDs exist and that no stale active candidate remains.

## Validation command

grep -n "Candidate ID:" .opencode/plans/current-phase.md
grep -n "patch-nextjs-security-line" .opencode/backlog/candidates.yaml
grep -n "reconcile-opencode-phase-state" .opencode/backlog/candidates.yaml
grep -n "publish-runtime-truth-readme" .opencode/backlog/candidates.yaml
grep -n "classify-screen-exports-reference" .opencode/backlog/candidates.yaml

## Acceptance criteria

- The active `Candidate ID` exists in backlog candidates.
- The founder priority order is recorded in one durable roadmap file.
- The `/phase-status` command explicitly checks backlog/current-phase alignment.
- No stale completed candidate remains as the active phase after the update.

## Completion summary

- Marked `patch-nextjs-security-line` as `status: completed` in backlog and added explicit status-selection guidance so completed candidates can be ignored safely.
- Added a durable founder-priority progress snapshot that shows the completed fix and the next unresolved candidate.
- Tightened `/phase-status` and `/priority-fixes` so they fail on missing or already-completed active candidates instead of silently accepting drift.
- Validation passed against the updated current-phase file and founder-priority candidate IDs in backlog.

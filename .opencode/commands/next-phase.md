# /next-phase

Select the next implementation phase from `.opencode/backlog/candidates.yaml` using the orchestrator rules.

## Required behavior

- Ignore completed candidates.
- Prefer bounded, high-priority, single-module work.
- Overwrite `.opencode/plans/current-phase.md` with the newly selected phase.
- Do not store workflow state elsewhere.

## Expected output

Write a complete current-phase plan and report the selected candidate ID.

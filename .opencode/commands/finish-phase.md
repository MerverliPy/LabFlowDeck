---
description: Finalize the active phase after implementation and validation
agent: orchestrator
---

# /finish-phase

Finalize the active phase after implementation and validation.

## Required behavior

- Check every acceptance criterion.
- Run or confirm the declared validation command.
- Record validation result and durable evidence.
- Update `.opencode/plans/current-phase.md` with final status and summary.
- Update the matching candidate in `.opencode/backlog/candidates.yaml`.
- Record completion metadata in backlog, including:
  - `status: completed`
  - `completion_note`
  - `validation_result`
  - `evidence_refs`
  - `completed_at`
- Archive the completed current phase into `.opencode/plans/history/` before any later phase overwrites it.
- Refuse completion if the active candidate is missing from backlog.
- Refuse completion if checklist items or evidence are incomplete.

## Completion gate

Completion is blocked unless:

- all task checklist items are complete or explicitly waived
- all acceptance-criteria checks are complete
- evidence is present for each acceptance criterion
- validation result is recorded
- backlog reconciliation succeeds
- archive step succeeds

<!-- validation-reconciliation-gate -->
## Validation command reconciliation gate

Before marking a candidate completed, `/finish-phase` must reconcile the validation command recorded in the backlog with the final validation command recorded in the phase record.

### Required checks
1. Read the final executed validation command from `.opencode/plans/current-phase.md`.
2. Read the matching candidate's `validation` field from `.opencode/backlog/candidates.yaml`.
3. Normalize only leading and trailing whitespace.
4. Require exact string equality after normalization.

### Failure rule
If the two validation commands differ, refuse completion. Do not archive the phase, do not overwrite the backlog entry, and do not mark the candidate completed.

### Refusal result
Return a refusal result containing:
- `reason: backlog validation does not match final phase validation`
- `expected_validation: <value from current-phase>`
- `backlog_validation: <value from backlog>`

The operator must update backlog validation first, then rerun `/finish-phase`.

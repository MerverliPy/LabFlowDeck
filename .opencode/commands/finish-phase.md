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

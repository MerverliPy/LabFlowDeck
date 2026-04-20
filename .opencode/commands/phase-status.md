# /phase-status

Inspect `.opencode/plans/current-phase.md` and `.opencode/backlog/candidates.yaml`.

## Required output

Emit a stable machine-readable JSON summary with these fields:

- `candidate_id`
- `current_phase_status`
- `backlog_candidate_exists`
- `backlog_marks_candidate_completed`
- `drift_detected`
- `open_task_count`
- `completed_task_count`
- `open_acceptance_count`
- `completed_acceptance_count`
- `missing_evidence_count`
- `missing_sections`
- `warnings`

## Required checks

- candidate exists in backlog
- completed-state reconciliation between current-phase and backlog
- open/completed task checklist counts
- open/completed acceptance-criteria counts
- missing evidence lines
- missing required durable sections

## Failure conditions

Report failure before anything else when:

- candidate is missing from backlog
- current-phase is completed but backlog is not reconciled
- backlog is completed while current-phase is still active

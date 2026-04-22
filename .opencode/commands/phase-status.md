---
description: Inspect current phase and backlog drift state
agent: orchestrator
---

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

<!-- archive-verification-phase-status -->
## Archive verification for completed phases

When `.opencode/plans/current-phase.md` reports `Status: completed`, `/phase-status` must verify that the completed phase is durably archived before any later overwrite is treated as safe.

### Required checks
1. Read `current_candidate_id` from `.opencode/plans/current-phase.md`.
2. Search `.opencode/` for a matching archive artifact, excluding `.opencode/plans/current-phase.md`.
3. A matching archive artifact must satisfy both conditions:
   - its path indicates archival storage, such as `/archive/` or `/completed/`
   - its contents identify the same candidate id
4. Read `.opencode/backlog/candidates.yaml` and verify that the matching candidate's `evidence_refs` includes that archive path.

### Required output fields
Include these fields in the structured result:
- `archive_required`
- `archive_exists`
- `archive_path`
- `backlog_references_archive`

### Failure rule
If `archive_required` is `true` and either `archive_exists` is `false` or `backlog_references_archive` is `false`, set:
- `drift_detected: true`
- `current_phase_status: blocked`

and set `next_action` to require archive completion before any phase advancement.

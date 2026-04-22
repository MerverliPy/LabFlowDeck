---
description: Select the next implementation phase from backlog using the orchestrator rules
agent: orchestrator
---

# /next-phase

Select the next implementation phase from `.opencode/backlog/candidates.yaml` using the orchestrator rules.

## Required behavior

- Ignore completed candidates.
- Prefer bounded, high-priority, single-module work.
- Apply the declared selection order and constraints from backlog.
- If the current phase is completed, ensure it has already been archived before overwrite.
- Overwrite `.opencode/plans/current-phase.md` with the newly selected phase.
- Do not store workflow state elsewhere.

## Durable recording requirement

Write the full evaluated-candidate reasoning into `.opencode/plans/current-phase.md` under `## Selection evidence`, including:

- evaluated candidate set
- excluded candidates and why
- exact selection-order rule that picked the winner
- why the selected candidate won
- expected validation command

<!-- archive-precondition-next-phase -->
## Mandatory archive precondition before overwrite

If `.opencode/plans/current-phase.md` exists and reports `Status: completed`, `/next-phase` must refuse to overwrite it until archive proof exists.

### Verification procedure
1. Read the current candidate id from `.opencode/plans/current-phase.md`.
2. Search `.opencode/` for a matching archive artifact, excluding `.opencode/plans/current-phase.md`.
3. Require a matching archive artifact whose path indicates archival storage and whose contents identify the same candidate id.
4. Confirm that the same archive path is referenced from the candidate's `evidence_refs` entry in `.opencode/backlog/candidates.yaml`.

### Refusal rule
If archive proof is missing, stop immediately.
Do not select a new candidate.
Do not overwrite `.opencode/plans/current-phase.md`.

### Refusal result
Return:
- `reason: current completed phase is not durably archived`
- `required_action: /finish-phase`
- `current_candidate_id: <candidate-id>`

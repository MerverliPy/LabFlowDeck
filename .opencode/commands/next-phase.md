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

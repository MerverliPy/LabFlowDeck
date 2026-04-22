---
description: Inspect workflow state and drive the next safe internal command
agent: orchestrator
---

Read:
- `.opencode/plans/current-phase.md`
- `.opencode/backlog/candidates.yaml`
- `AGENTS.md`
- `.opencode/AGENTS.md`

Use `bash scripts/dev/autoflow.sh inspect-json` as the workflow source of truth.

Important:
- this workflow is internal-only
- do not surface workflow state through product UI, API, auth, or runtime files
- stop if the active phase would require protected product-path changes without explicit approval
- when the state is deterministic, continue through the next repo-owned command instead of handing control back prematurely

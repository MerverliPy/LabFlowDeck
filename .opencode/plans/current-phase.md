# Current Phase
Status: active
Candidate ID: clone-backend-internal-workflow

## Goal

- Clone the backend-style internal workflow command surface into LabFlowDeck.
- Add the missing internal guardrails and repo-owned custom commands without changing shipped `apps/web` product behavior.
- Keep the transplant adapted to LabFlowDeck's existing backlog/current-phase model instead of inventing a second workflow state system.

## Why this phase is next

The user explicitly asked to clone the backend internal agent workflow and custom commands for this repository. LabFlowDeck already has a partial `.opencode` workflow, but it is missing the backend-style internal workflow rules file, reviewer role, `/autoflow`, `/workflow-check`, and the supporting repo-owned guard scripts that make the command surface coherent. This bounded internal-only transplant is the smallest meaningful way to satisfy the request while preserving the repo's shell-first product boundaries.

## Selection evidence

- Evaluated candidate set:
  - `clone-backend-internal-workflow`
  - `mobile-playwright-smoke`
  - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - `mobile-playwright-smoke` — valid backlog work, but it does not address the user's explicit request to clone the backend internal workflow and custom commands.
  - `workflow-shell-truth-evals` — related to workflow hygiene, but it audits prompt behavior rather than transplanting the missing command surface and guard scripts.
- Exact selection-order rule that picked the winner:
  - Rule 1: explicit user scope.
- Why the selected candidate won:
  - It directly matches the user's requested internal-workflow clone.
  - It stays internal-only and does not widen product/backend runtime scope.
  - It has a clear validation path through repo-owned workflow scripts.
- Expected validation command:
  - `bash scripts/dev/workflow-check.sh`
  - `bash scripts/dev/autoflow.sh inspect-json`

## Primary files

- `.opencode/AGENTS.md`
- `.opencode/agents/orchestrator.md`
- `.opencode/agents/builder.md`
- `.opencode/agents/validator.md`
- `.opencode/agents/shipper.md`
- `.opencode/agents/reviewer.md`
- `.opencode/commands/autoflow.md`
- `.opencode/commands/review-phase.md`
- `.opencode/commands/validate-phase.md`
- `.opencode/commands/fix-validation.md`
- `.opencode/commands/workflow-check.md`
- `scripts/dev/workflow-check.sh`
- `scripts/dev/autoflow.sh`
- `scripts/phase-status-json.py`
- `package.json`
- `opencode.json`
- `.opencode/plans/current-phase.md`

## Expected max files changed
17

## Risk

- Transplanting backend-style workflow surfaces too literally could introduce assumptions about a release registry that LabFlowDeck does not use.
- New internal command files may drift from existing LabFlowDeck phase-status and finish-phase behavior if the guard scripts are not adapted carefully.
- The repo already contains local uncommitted GitHub workflow files outside this phase, so edits must remain tightly scoped to internal workflow paths.

## In scope

- Add the missing internal workflow rules file under `.opencode/`.
- Add the missing reviewer role and backend-style custom command files for internal workflow operation.
- Add repo-owned `scripts/dev/workflow-check.sh` and `scripts/dev/autoflow.sh` adapted to LabFlowDeck's backlog/current-phase model.
- Keep phase-status parsing aligned so the new workflow scripts classify checklist state correctly.
- Wire minimal package/opencode config needed to run the cloned internal workflow commands.

## Out of scope

- Any changes under `apps/web/**`.
- README or shipped product-surface changes.
- Introducing a separate `docs/releases/phase-registry.md` system.
- Replacing LabFlowDeck's existing backlog/current-phase model.
- Committing or pushing workflow changes.

## Task checklist

- [x] Add `.opencode/AGENTS.md` with internal workflow invariants and protected-path rules adapted for LabFlowDeck.
- [x] Add the missing internal custom command files: `/autoflow`, `/review-phase`, `/validate-phase`, `/fix-validation`, and `/workflow-check`.
- [x] Add or adapt the internal agent prompts so the cloned command surface has backend-style role boundaries.
- [x] Add repo-owned `scripts/dev/workflow-check.sh` and `scripts/dev/autoflow.sh` that operate on LabFlowDeck's existing phase/backlog state.
- [x] Wire minimal package and OpenCode config needed for the new command surface.
- [x] Run the declared validation commands and record evidence.

## Validation

Status: PASS

Evidence:
- Added `.opencode/AGENTS.md`, backend-style agent role prompts, and the missing internal custom command files.
- Added repo-owned `scripts/dev/workflow-check.sh` and `scripts/dev/autoflow.sh` adapted to the existing LabFlowDeck backlog/current-phase model.
- `bash scripts/dev/workflow-check.sh` passed.
- `bash scripts/dev/autoflow.sh inspect-json` now returns `candidate_id=clone-backend-internal-workflow`, `drift_detected=false`, and `next_action=finish-phase` after checklist reconciliation.

Blockers:
- none

Ready to ship:
- yes

## Completion summary

- Backend-style internal workflow rules, command files, and repo-owned guard scripts were transplanted into LabFlowDeck without touching `apps/web`.
- README_NOT_NEEDED: this phase is internal-only workflow hygiene and does not change shipped product behavior, setup truth, or user-facing claims.
- The remaining workflow step is repo-state reconciliation via `/finish-phase` if the operator wants backlog/archive metadata finalized immediately.

## Validation command

`bash scripts/dev/workflow-check.sh`

`bash scripts/dev/autoflow.sh inspect-json`

## Acceptance criteria checks

- [x] LabFlowDeck gains backend-style internal workflow rules, richer command surfaces, and repo-owned guard scripts without changing `apps/web` product behavior.
  Evidence: `.opencode/AGENTS.md`, `.opencode/agents/orchestrator.md`, `.opencode/agents/builder.md`, `.opencode/agents/validator.md`, `.opencode/agents/shipper.md`, and `.opencode/agents/reviewer.md` were added or adapted while `apps/web/**` remained untouched.
- [x] `/autoflow`, `/review-phase`, `/validate-phase`, `/fix-validation`, and `/workflow-check` exist as repo-owned custom commands.
  Evidence: `.opencode/commands/autoflow.md`, `.opencode/commands/review-phase.md`, `.opencode/commands/validate-phase.md`, `.opencode/commands/fix-validation.md`, and `.opencode/commands/workflow-check.md` exist with repo-owned command definitions.
- [x] The new workflow scripts read the existing LabFlowDeck backlog/current-phase state instead of inventing a separate release registry layer.
  Evidence: `scripts/dev/workflow-check.sh`, `scripts/dev/autoflow.sh`, and `scripts/phase-status-json.py` operate only on `.opencode/backlog/candidates.yaml` and `.opencode/plans/current-phase.md`.
- [x] Internal workflow validation passes with the new scripts.
  Evidence: `bash scripts/dev/workflow-check.sh` passed and `bash scripts/dev/autoflow.sh inspect-json` returned `drift_detected=false`.

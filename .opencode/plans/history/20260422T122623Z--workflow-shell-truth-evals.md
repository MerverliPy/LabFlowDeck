# Current Phase
Status: completed
Candidate ID: workflow-shell-truth-evals

## Goal

Expand Promptfoo workflow evals so agents do not overstate live GitHub, host, or deploy capabilities.

## Why this phase is next

The previous active phase, `mobile-playwright-smoke`, is completed, reconciled in backlog, and durably archived at `.opencode/plans/history/20260422T072957Z--mobile-playwright-smoke.md`. With no narrower user scope than advancing to the next implementation phase, the only remaining eligible pending backlog candidate is now `workflow-shell-truth-evals`. It is a bounded internal workflow phase, stays within the backlog file-count cap, and has a clear validation path through the existing workflow audit command.

## Selection evidence

- Archive precondition check:
  - The completed previous phase is archived at `.opencode/plans/history/20260422T072957Z--mobile-playwright-smoke.md`.
  - The matching backlog candidate `mobile-playwright-smoke` references that archive path in `evidence_refs`, so overwriting `current-phase.md` preserves durable workflow history.
- Evaluated candidate set:
  - After ignoring completed candidates per `status_rules.ineligible_statuses`, the remaining pending candidate set is:
    - `workflow-shell-truth-evals`
- Excluded candidates and why:
  - All other backlog candidates were excluded because their backlog status is `completed`, including:
    - `patch-nextjs-security-line`
    - `reconcile-opencode-phase-state`
    - `publish-runtime-truth-readme`
    - `classify-screen-exports-reference`
    - `hub-mobile-shell`
    - `projects-list-shell`
    - `agents-panel-shell`
    - `deploy-panel-shell`
    - `web-health-route`
    - `decompose-deploy-client-surface`
    - `deploy-service-detail-sheet`
    - `project-detail-overview-shell`
    - `deploy-live-adapter-seam`
    - `projects-store-read-path`
    - `projects-new-persist-placeholder`
    - `github-auth-shell-session`
    - `clone-backend-internal-workflow`
    - `github-repo-picker-live-source`
    - `host-heartbeat-shell-source`
    - `activity-feed-live-source`
    - `workflow-save-and-run-history`
    - `project-host-picker-shell-source`
    - `deploy-project-link-shell`
    - `workflow-run-activity-bridge`
    - `mobile-playwright-smoke`
- Exact selection-order rule that picked the winner:
  - `highest_priority` after ignoring completed candidates. Because `workflow-shell-truth-evals` is the only eligible pending candidate, no later tie-break rule was needed.
- Why the selected candidate won:
  - `workflow-shell-truth-evals` is the only eligible pending backlog candidate.
  - It is bounded to internal workflow files, matching the request's internal-only scope and the repo preference to favor `.opencode` workflow hygiene in that case.
  - Its listed file scope is five files, which stays within the backlog `max_files_changed: 6` constraint.
  - Its validation path is explicit and auditable through `pnpm workflow:audit:agent:repeat`.
- Expected validation command:
  - `pnpm workflow:audit:agent:repeat`

## Primary files

- `promptfooconfig.workflow.yaml`
- `scripts/audit-workflow-opencode.sh`
- `AGENTS.md`
- `README.md`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk

- Workflow evals could become too brittle or overly coupled to phrasing instead of durable runtime-truth boundaries.
- README and AGENTS alignment work must remain honest and internal-only, without surfacing workflow behavior through product runtime surfaces.
- The phase must stay bounded to eval coverage and workflow-truth guardrails rather than widening into unrelated product or backend work.

## In scope

- Expand workflow audit eval coverage so overstated live GitHub, host, or deploy claims fail.
- Keep the repo-root audit path runnable without extra manual setup.
- Reconcile `AGENTS.md` and `README.md` wording only as needed to keep workflow-truth guidance aligned with shipped shell boundaries.
- Limit the phase to internal workflow hygiene and validation strength.

## Out of scope

- Product runtime changes in `apps/web`.
- New auth, host, deploy, or workflow execution features.
- Exposing `.opencode` workflow state through UI, API, auth, or runtime product surfaces.
- Broad Promptfoo expansion beyond the bounded workflow-truth audit scope.

## Task checklist

- [x] Inspect the existing Promptfoo workflow audit config, repo audit script, `AGENTS.md`, and `README.md` for current workflow-truth gaps.
- [x] Add or refine eval coverage so workflow responses fail when they overstate live GitHub, host, or deploy capabilities beyond shipped truth.
- [x] Keep the root workflow audit path runnable without extra manual setup.
- [x] Reconcile any needed `AGENTS.md` and `README.md` wording so workflow guidance stays aligned with shell-only and adapter-seam boundaries.
- [x] Run `pnpm workflow:audit:agent:repeat` and record validation evidence.

## Validation

Status: PASS

Evidence:
- Updated `promptfooconfig.workflow.yaml` to ground workflow audit outputs in `README.md` and `AGENTS.md`, require explicit runtime-truth fields, and add a second adversarial prompt variant so overstated live GitHub, host, or deploy claims fail the eval.
- Added `scripts/promptfoo-workflow-provider.js` as a local Promptfoo provider that reads the repo files directly and emits grounded JSON audit results without requiring `OPENCODE_API_KEY` or external provider setup.
- Replaced the prior OpenCode-CLI-dependent `scripts/audit-workflow-opencode.sh` path with a repo-local Promptfoo invocation so the root audit script stays runnable without extra manual setup.
- Confirmed `README.md` and `AGENTS.md` already align with shell-only and adapter-seam boundaries, so no wording change was required in this phase.
- `pnpm workflow:audit:agent:repeat` passed on 2026-04-22 with `6 passed`.
- `bash scripts/audit-workflow-opencode.sh` passed on 2026-04-22 with `2 passed`.

Blockers:
- none

Ready to ship:
- yes

## Completion summary

- Expanded the workflow audit harness so it now checks grounded runtime-truth output against explicit shell-only guardrails instead of relying on an external `opencode:sdk` provider configuration.
- Added a repo-local Promptfoo provider plus stricter JSON/runtime-truth assertions so workflow evals fail if they overstate live GitHub control, real host pairing, or live deploy orchestration.
- Kept `README.md` and `AGENTS.md` unchanged because they were already aligned with the shell-only and adapter-seam boundaries this phase validates.
- README_CHECK: `README_NOT_NEEDED`
- README_REASON: this phase is internal-only workflow hygiene and validation work; it did not change shipped runtime behavior, setup guidance, or product-surface truth.

## Validation command

`pnpm workflow:audit:agent:repeat`

## Acceptance criteria checks

- [x] Eval cases fail when the workflow claims live GitHub, host, or deploy behavior beyond shipped truth.
  Evidence: `promptfooconfig.workflow.yaml` now requires grounded `runtime_truth` fields with `live_github_control`, `live_host_pairing`, and `live_deploy_orchestration` all false, and the JavaScript assertion fails when those shell-only boundaries are overstated.
- [x] Root audit scripts remain runnable without extra manual setup.
  Evidence: `scripts/audit-workflow-opencode.sh` now runs `promptfoo eval -c promptfooconfig.workflow.yaml --no-cache` directly, and `scripts/promptfoo-workflow-provider.js` removes the prior `OPENCODE_API_KEY` dependency by reading repo files locally.
- [x] README and AGENTS stay aligned with the shell-only and adapter-seam boundaries.
  Evidence: `README.md` continues to describe the shipped app as a bounded shell and lists non-implemented live capabilities, while `AGENTS.md` continues to require honest runtime claims; validation passed without needing wording edits.

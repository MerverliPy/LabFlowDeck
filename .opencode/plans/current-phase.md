# Current Phase
Status: completed
Candidate ID: internal-workflow-provider-switch

## Goal
Add one manual switch for the repo’s internal workflow setup so the maintainer can explicitly choose OpenAI or Copilot for internal OpenCode workflow usage without changing multiple config files by hand.

## Why this phase is next
The user clarified that the requested provider switch is for the repository’s internal workflow path, not the shipped product surface. The smallest safe phase is therefore a `.opencode` and workflow-config hygiene change centered on internal config entry points such as `opencode.json`, workflow audit config, and related scripts. This returned product-side planning to its prior state and kept the change aligned with internal workflow control only.

## Selection evidence
- Evaluated candidate set: `internal-workflow-provider-switch`, `host-heartbeat-shell-source`, `activity-feed-live-source`, `workflow-save-and-run-history`, `project-host-picker-shell-source`, `deploy-project-link-shell`, `workflow-run-activity-bridge`.
- Excluded candidates and why:
  - `host-heartbeat-shell-source` was excluded because it is product-shell host status work and does not address the user’s internal workflow provider request.
  - `activity-feed-live-source` was excluded because it is product-shell activity plumbing rather than internal workflow configuration.
  - `workflow-save-and-run-history` was excluded because it is product-side workflow persistence, not repo-internal provider control.
  - `project-host-picker-shell-source` was excluded because it is product-side project creation scope unrelated to internal workflow providers.
  - `deploy-project-link-shell` was excluded because it is product-side deploy navigation work.
  - `workflow-run-activity-bridge` was excluded because it remains product-side workflow activity work rather than internal workflow tooling.
- Exact selection-order rule that picked the winner: `explicit_user_scope`.
- Why the selected candidate won: it directly matches the clarified request, fits `.opencode` workflow hygiene, has a bounded validation path, and avoids changing `apps/web` product behavior.
- Expected validation command: `pnpm workflow:provider -- openai --dry-run && pnpm workflow:provider -- copilot --dry-run && pnpm workflow:phase-lint`

## Primary files
- `package.json`
- `scripts/workflow-provider.mjs`
- `promptfooconfig.workflow.yaml`
- `scripts/audit-workflow-opencode.sh`
- `README.md`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk
Low to medium. The main risk was making internal provider switching ambiguous across multiple workflow entry points or implying that product-side workflows now support the same provider control when they do not.

## In scope
- Add one manual switch surface for the internal repo workflow provider.
- Route the chosen provider through the bounded internal OpenCode workflow entry path.
- Keep the switch explicit and maintainer-controlled.
- Document required operator guidance for the internal workflow path.

## Out of scope
- Any `apps/web` product-side provider selection or UI changes.
- Automatic provider detection, fallback, or rotation.
- Live provider credential setup beyond documented configuration expectations.
- Broad refactors of internal workflow architecture.

## Task checklist
- [x] Audit the current internal workflow provider touchpoints in `opencode.json`, promptfoo workflow config, and workflow scripts.
- [x] Add one bounded manual provider switch entry path for `openai` and `copilot`.
- [x] Route the selected provider through the internal workflow configs without requiring multi-file hand edits.
- [x] Update README guidance for the internal workflow setup change.
- [x] Run dry-run validation for both providers.
- [x] Run `pnpm workflow:phase-lint`.

## Validation command
`pnpm workflow:provider -- openai --dry-run && pnpm workflow:provider -- copilot --dry-run && pnpm workflow:phase-lint`

## Acceptance criteria checks
- [x] The maintainer can explicitly choose `openai` or `copilot` for the repo's internal workflow path without editing multiple files by hand.
  - Evidence: `package.json` exposes `pnpm workflow:provider`; `scripts/workflow-provider.mjs` provides `openai`, `copilot`, `current`, and `--dry-run` modes from one entry point.
- [x] The chosen provider flows through the bounded internal OpenCode or workflow-audit entry path from one manual switch surface.
  - Evidence: `scripts/workflow-provider.mjs` updates `opencode.json`, and `scripts/audit-workflow-opencode.sh` explicitly uses the currently selected `opencode.json` provider.
- [x] The phase does not change `apps/web` runtime behavior or imply product-side provider switching.
  - Evidence: only root workflow/config files plus README guidance changed; no `apps/web` runtime files were modified.
- [x] The validation commands pass.
  - Evidence: validation section below records successful dry runs for both providers, a real switch to Copilot and back to OpenAI, and a passing `pnpm workflow:phase-lint`.

## Validation

- Result: passed on 2026-04-21.
- Command: `pnpm workflow:provider -- openai --dry-run && pnpm workflow:provider -- copilot --dry-run && pnpm workflow:phase-lint`
- Additional command: `pnpm workflow:provider -- current`
- Additional command: `pnpm workflow:provider -- copilot && pnpm workflow:provider -- current && pnpm workflow:provider -- openai && pnpm workflow:provider -- current`
- Evidence:
  - `pnpm workflow:provider -- openai --dry-run` reported the current OpenAI config and made no file changes.
  - `pnpm workflow:provider -- copilot --dry-run` reported the OpenAI-to-Copilot model mapping and made no file changes.
  - `pnpm workflow:provider -- copilot` updated `opencode.json`, `pnpm workflow:provider -- current` then reported `github-copilot/gpt-5.4`, and a follow-up `pnpm workflow:provider -- openai` restored the original OpenAI config.
  - `pnpm workflow:phase-lint` passed after phase evidence and completion sections were recorded.

## Completion summary

Added a single internal workflow provider switch command at `pnpm workflow:provider` so you can manually select `openai` or `copilot`, inspect the current provider, and dry-run the change before writing `opencode.json`. Documented the internal-only scope in README and added workflow-config comments so this does not imply any product-side provider switching in `apps/web`.

- README_CHECK: `README_REQUIRED`
- README_REASON: The phase changed internal operator guidance by adding a new repo workflow command and documenting how provider selection now works.

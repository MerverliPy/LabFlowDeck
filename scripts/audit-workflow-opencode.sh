#!/usr/bin/env bash
set -euo pipefail

# Uses the provider currently selected in opencode.json.
# Switch manually with: pnpm workflow:provider -- openai|copilot

resolve_opencode_bin() {
  if [[ -n "${OPENCODE_BIN:-}" ]]; then
    printf '%s\n' "$OPENCODE_BIN"
    return 0
  fi

  if command -v opencode >/dev/null 2>&1; then
    command -v opencode
    return 0
  fi

  if [[ -x "./node_modules/.bin/opencode" ]]; then
    printf '%s\n' "./node_modules/.bin/opencode"
    return 0
  fi

  return 1
}

if ! OPENCODE_BIN="$(resolve_opencode_bin)"; then
  cat >&2 <<'MSG'
ERROR: OpenCode CLI is not available.
Tried:
- OPENCODE_BIN override
- global `opencode`
- local `./node_modules/.bin/opencode`

Install or expose the CLI, then rerun this script.
MSG
  exit 127
fi

exec "$OPENCODE_BIN" run \
  --agent orchestrator \
  "Audit this repository's workflow implementation only.

Inspect these files:
- AGENTS.md
- opencode.json
- .opencode/backlog/candidates.yaml
- .opencode/plans/current-phase.md
- .opencode/commands/phase-status.md
- .opencode/commands/next-phase.md
- .opencode/commands/finish-phase.md

Return strict JSON with this shape:
{
  \"repo_summary\": string,
  \"workflow_state\": {
    \"current_candidate_id\": string,
    \"current_phase_status\": string,
    \"backlog_candidate_exists\": boolean,
    \"backlog_marks_candidate_completed\": boolean,
    \"drift_detected\": boolean,
    \"evidence_files\": string[]
  },
  \"weak_points\": [
    {
      \"title\": string,
      \"severity\": string,
      \"files\": string[],
      \"reason\": string,
      \"improvement\": string
    }
  ],
  \"next_action\": {
    \"command\": string,
    \"reason\": string
  }
}

Requirements:
- Ground all conclusions in the listed files.
- Focus on workflow reliability, auditability, and validation strength.
- Do not discuss product features except where they affect workflow verification.
- Return JSON only."

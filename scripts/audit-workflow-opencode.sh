#!/usr/bin/env bash
set -euo pipefail

opencode run \
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

#!/usr/bin/env bash
set -euo pipefail

phase_file=".opencode/plans/current-phase.md"
history_dir=".opencode/plans/history"

candidate_id="$(awk -F': ' '/^Candidate ID:/ {print $2; exit}' "$phase_file")"
status="$(awk -F': ' '/^Status:/ {print tolower($2); exit}' "$phase_file")"

if [[ -z "${candidate_id:-}" ]]; then
  echo "FAIL: missing Candidate ID in $phase_file" >&2
  exit 1
fi

if [[ "${status:-}" != "completed" ]]; then
  echo "No archive created: current phase status is '${status:-missing}', not completed."
  exit 0
fi

ts="$(date -u +%Y%m%dT%H%M%SZ)"
out="${history_dir}/${ts}--${candidate_id}.md"

cp "$phase_file" "$out"
echo "Archived current phase to $out"

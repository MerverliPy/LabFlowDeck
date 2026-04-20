#!/usr/bin/env bash
set -euo pipefail

phase_file=".opencode/plans/current-phase.md"

fail=0

require_line() {
  local pattern="$1"
  local message="$2"
  if ! grep -qE "$pattern" "$phase_file"; then
    echo "FAIL: $message"
    fail=1
  fi
}

require_section() {
  local text="$1"
  if ! grep -q "^## ${text}$" "$phase_file"; then
    echo "FAIL: missing section '## ${text}'"
    fail=1
  fi
}

status="$(awk -F': ' '/^Status:/ {print $2; exit}' "$phase_file" | tr '[:upper:]' '[:lower:]')"

case "${status:-}" in
  planned|in_progress|blocked|completed) ;;
  *)
    echo "FAIL: Status must be one of planned, in_progress, blocked, completed"
    fail=1
    ;;
esac

require_line '^Candidate ID: .+$' "missing Candidate ID"
require_line '^Status: .+$' "missing Status"
require_section "Goal"
require_section "Why this phase is next"
require_section "Primary files"
require_section "Expected max files changed"
require_section "In scope"
require_section "Out of scope"
require_section "Task checklist"
require_section "Acceptance criteria checks"
require_section "Validation command"
require_section "Validation"
require_section "Completion summary"

if ! grep -qE '^- \[[ x]\] ' "$phase_file"; then
  echo "FAIL: no checklist items found"
  fail=1
fi

if ! awk '
  /^## Acceptance criteria checks$/ {in_section=1; next}
  /^## / && in_section {exit}
  in_section && /^- \[[ x]\] / {found=1}
  END {exit found ? 0 : 1}
' "$phase_file"; then
  echo "FAIL: acceptance criteria checks section has no checklist items"
  fail=1
fi

if ! grep -q 'Evidence:' "$phase_file"; then
  echo "FAIL: no Evidence: lines found in current phase"
  fail=1
fi

if [[ $fail -ne 0 ]]; then
  exit 1
fi

echo "Current phase structure passed."

#!/usr/bin/env bash
set -euo pipefail

phase_file=".opencode/plans/current-phase.md"
backlog_file=".opencode/backlog/candidates.yaml"

fail=0
warn=0

current_candidate="$(awk -F': ' '/^Candidate ID:/ {print $2; exit}' "$phase_file")"
current_status="$(awk -F': ' '/^Status:/ {print tolower($2); exit}' "$phase_file")"

if [[ -z "${current_candidate:-}" ]]; then
  echo "FAIL: missing Candidate ID in $phase_file"
  exit 1
fi

if ! grep -q "^  - id: ${current_candidate}$" "$backlog_file"; then
  echo "FAIL: backlog/current-phase drift: ${current_candidate} not found in backlog"
  exit 1
fi

candidate_block="$(awk -v id="$current_candidate" '
  /^  - id: / {
    if (capture) exit
    capture = ($0 == "  - id: " id)
  }
  capture {print}
' "$backlog_file")"

backlog_completed="false"
if grep -q '^    status: completed$' <<<"$candidate_block"; then
  backlog_completed="true"
fi

echo "Current candidate: $current_candidate"
echo "Current status:    $current_status"
echo "Backlog completed: $backlog_completed"

if [[ "$current_status" == "completed" && "$backlog_completed" != "true" ]]; then
  echo "FAIL: current-phase marks ${current_candidate} completed, but backlog does not."
  fail=1
fi

if [[ "$current_status" != "completed" && "$backlog_completed" == "true" ]]; then
  echo "FAIL: backlog marks ${current_candidate} completed, but it is still active in current-phase."
  fail=1
fi

if node <<'NODE'
const fs = require('fs');
const root = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const web = JSON.parse(fs.readFileSync('apps/web/package.json', 'utf8'));
const rootScripts = root.scripts || {};
const webScripts = web.scripts || {};
process.exit(webScripts.test && !rootScripts['test:web'] ? 1 : 0);
NODE
then
  echo "PASS: root package.json exposes web tests or apps/web has no test script."
else
  echo "WARN: apps/web/package.json has a test script, but root package.json does not expose test:web."
  warn=1
fi

if [[ $fail -ne 0 ]]; then
  exit 1
fi

if [[ $warn -ne 0 ]]; then
  echo "Audit finished with warnings."
else
  echo "Audit passed."
fi

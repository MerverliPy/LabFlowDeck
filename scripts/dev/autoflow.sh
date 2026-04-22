#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

phase_json() {
python3 - <<'PY'
from pathlib import Path
import json
import re

text = Path('.opencode/plans/current-phase.md').read_text()

def line_value(label: str):
    m = re.search(rf'^{re.escape(label)}:\s*(.+)$', text, re.MULTILINE)
    return m.group(1).strip() if m else ''

out = {
    'title': '',
    'status': line_value('Status'),
    'candidate_id': line_value('Candidate ID'),
    'validation_command': '',
}

for line in text.splitlines():
    if line.startswith('# '):
        out['title'] = line[2:].strip()
        break

section = re.search(r'(?ms)^## Validation command\s*(.*?)(?=^## |\Z)', text)
if section:
    for raw in section.group(1).splitlines():
        stripped = raw.strip()
        if stripped and not stripped.startswith('```'):
            out['validation_command'] = stripped.strip('`').strip()
            break

print(json.dumps(out))
PY
}

collect_state() {
  local phase status_json title current_status candidate_id validation_command next_action blocker manual_next_command open_tasks open_acceptance completed_acceptance missing_evidence drift
  phase="$(phase_json)"
  status_json="$(python3 scripts/phase-status-json.py)"

  title="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["title"])' "$phase")"
  current_status="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["status"])' "$phase")"
  candidate_id="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["candidate_id"])' "$phase")"
  validation_command="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["validation_command"])' "$phase")"
  drift="$(python3 -c 'import json,sys; print(str(json.loads(sys.argv[1])["drift_detected"]).lower())' "$status_json")"
  open_tasks="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["open_task_count"])' "$status_json")"
  open_acceptance="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["open_acceptance_count"])' "$status_json")"
  completed_acceptance="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["completed_acceptance_count"])' "$status_json")"
  missing_evidence="$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["missing_evidence_count"])' "$status_json")"

  next_action='stop-blocked'
  blocker='workflow state is ambiguous'

  if [[ "$drift" == "true" ]]; then
    next_action='stop-blocked'
    blocker='workflow drift detected'
  elif [[ "$current_status" == "completed" ]]; then
    next_action='ship-phase'
    blocker=''
  elif [[ "$open_tasks" -gt 0 ]]; then
    next_action='run-phase'
    blocker=''
  elif [[ "$open_acceptance" -gt 0 || "$missing_evidence" -gt 0 ]]; then
    next_action='validate-phase'
    blocker=''
  elif [[ "$completed_acceptance" -gt 0 ]]; then
    next_action='finish-phase'
    blocker=''
  else
    next_action='next-phase'
    blocker='no active executable work detected'
  fi

  case "$next_action" in
    run-phase|validate-phase|finish-phase|ship-phase|next-phase) manual_next_command="/$next_action" ;;
    *) manual_next_command='/phase-status' ;;
  esac

  cat <<EOF
CURRENT_PHASE_TITLE=$title
CURRENT_STATUS=$current_status
CANDIDATE_ID=$candidate_id
VALIDATION_COMMAND=$validation_command
DRIFT_DETECTED=$drift
OPEN_TASK_COUNT=$open_tasks
OPEN_ACCEPTANCE_COUNT=$open_acceptance
COMPLETED_ACCEPTANCE_COUNT=$completed_acceptance
MISSING_EVIDENCE_COUNT=$missing_evidence
NEXT_ACTION=$next_action
BLOCKER=$blocker
MANUAL_NEXT_COMMAND=$manual_next_command
EOF
}

inspect() { collect_state; }
inspect_json() {
  local kv
  kv="$(collect_state)"
  python3 - <<'PY' "$kv"
import json
import sys

out = {}
for raw in sys.argv[1].splitlines():
    if '=' in raw:
        key, value = raw.split('=', 1)
        out[key.lower()] = value
print(json.dumps(out))
PY
}
next_action_only() { collect_state | python3 - <<'PY'
import sys
for raw in sys.stdin:
    if raw.startswith('NEXT_ACTION='):
        print(raw.split('=', 1)[1].strip())
        break
PY
}
manual_next_command() { collect_state | python3 - <<'PY'
import sys
for raw in sys.stdin:
    if raw.startswith('MANUAL_NEXT_COMMAND='):
        print(raw.split('=', 1)[1].strip())
        break
PY
}

case "${1:-inspect}" in
  inspect) inspect ;;
  inspect-json) inspect_json ;;
  next-action) next_action_only ;;
  manual-next-command) manual_next_command ;;
  *) fail 'usage: bash scripts/dev/autoflow.sh [inspect|inspect-json|next-action|manual-next-command]' ;;
esac

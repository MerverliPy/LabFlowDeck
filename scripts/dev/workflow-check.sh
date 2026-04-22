#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "FAIL: $1"
  exit 1
}

pass() {
  echo "PASS: $1"
}

[[ -f .opencode/plans/current-phase.md ]] || fail 'missing .opencode/plans/current-phase.md'
[[ -f .opencode/backlog/candidates.yaml ]] || fail 'missing .opencode/backlog/candidates.yaml'
[[ -f AGENTS.md ]] || fail 'missing AGENTS.md'
[[ -f .opencode/AGENTS.md ]] || fail 'missing .opencode/AGENTS.md'
[[ -f opencode.json ]] || fail 'missing opencode.json'
[[ -f .opencode/agents/orchestrator.md ]] || fail 'missing .opencode/agents/orchestrator.md'
[[ -f .opencode/agents/builder.md ]] || fail 'missing .opencode/agents/builder.md'
[[ -f .opencode/agents/validator.md ]] || fail 'missing .opencode/agents/validator.md'
[[ -f .opencode/agents/shipper.md ]] || fail 'missing .opencode/agents/shipper.md'
[[ -f .opencode/agents/reviewer.md ]] || fail 'missing .opencode/agents/reviewer.md'
[[ -f .opencode/commands/autoflow.md ]] || fail 'missing .opencode/commands/autoflow.md'
[[ -f .opencode/commands/workflow-check.md ]] || fail 'missing .opencode/commands/workflow-check.md'
[[ -f .opencode/commands/validate-phase.md ]] || fail 'missing .opencode/commands/validate-phase.md'
[[ -f .opencode/commands/review-phase.md ]] || fail 'missing .opencode/commands/review-phase.md'
[[ -f .opencode/commands/fix-validation.md ]] || fail 'missing .opencode/commands/fix-validation.md'

status_json="$(python3 scripts/phase-status-json.py)"

python3 - <<'PY' "$status_json"
import json
import sys
from pathlib import Path

status = json.loads(sys.argv[1])
required = [
    "candidate_id",
    "current_phase_status",
    "backlog_candidate_exists",
    "drift_detected",
    "missing_sections",
]
for key in required:
    if key not in status:
        raise SystemExit(f"phase-status output missing key: {key}")

if not status["candidate_id"]:
    raise SystemExit("current phase is missing Candidate ID")
if not status["backlog_candidate_exists"]:
    raise SystemExit("current phase candidate is missing from backlog")
if status["drift_detected"]:
    raise SystemExit("workflow drift detected between current phase and backlog")
if status["missing_sections"]:
    raise SystemExit("current phase is missing required sections: " + ", ".join(status["missing_sections"]))

text = Path('.opencode/plans/current-phase.md').read_text()
if '## Validation command' not in text:
    raise SystemExit('current phase is missing Validation command section')

package = json.loads(Path('package.json').read_text())
scripts = package.get('scripts', {})
for script_name in ['workflow:check', 'workflow:autoflow:inspect']:
    if script_name not in scripts:
        raise SystemExit(f'package.json is missing required workflow script: {script_name}')

workflow_rules = Path('.opencode/AGENTS.md').read_text()
required_phrases = [
    'Workflow invariants',
    'Protected path rules',
    'commands must distinguish internal workflow validation from product runtime validation',
]
for phrase in required_phrases:
    if phrase not in workflow_rules:
        raise SystemExit(f'.opencode/AGENTS.md is missing required phrase: {phrase}')
PY

pass 'workflow invariants look consistent'

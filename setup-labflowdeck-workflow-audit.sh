#!/usr/bin/env bash
set -euo pipefail

mkdir -p scripts

cat > scripts/audit-workflow-state.sh <<'SH'
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
SH
chmod +x scripts/audit-workflow-state.sh

cat > promptfooconfig.workflow.yaml <<'YAML'
description: LabFlowDeck workflow audit

prompts:
  - |
      Audit the LabFlowDeck workflow implementation, not the product features.

      Inspect:
      - AGENTS.md
      - opencode.json
      - .opencode/backlog/candidates.yaml
      - .opencode/plans/current-phase.md
      - .opencode/commands/phase-status.md
      - .opencode/commands/next-phase.md
      - .opencode/commands/finish-phase.md

      Return only JSON.

      Required output:
      - repo_summary
      - workflow_state
      - weak_points
      - next_action

      Requirements:
      - Ground every conclusion in repository files you actually inspected.
      - Detect workflow-state drift between backlog and current-phase.
      - Identify 2 to 4 highest-value workflow improvements for reliability, auditability, or validation strength.
      - Recommend the next maintainer action as a concrete command.

providers:
  - id: opencode:sdk
    config:
      working_dir: .
      agent: orchestrator
      tools:
        read: true
        grep: true
        glob: true
        list: true
      permission:
        external_directory: deny
        doom_loop: deny
      format:
        type: json_schema
        schema:
          type: object
          additionalProperties: false
          properties:
            repo_summary:
              type: string
            workflow_state:
              type: object
              additionalProperties: false
              properties:
                current_candidate_id:
                  type: string
                current_phase_status:
                  type: string
                backlog_candidate_exists:
                  type: boolean
                backlog_marks_candidate_completed:
                  type: boolean
                drift_detected:
                  type: boolean
                evidence_files:
                  type: array
                  items:
                    type: string
              required:
                - current_candidate_id
                - current_phase_status
                - backlog_candidate_exists
                - backlog_marks_candidate_completed
                - drift_detected
                - evidence_files
            weak_points:
              type: array
              minItems: 2
              items:
                type: object
                additionalProperties: false
                properties:
                  title:
                    type: string
                  severity:
                    type: string
                  files:
                    type: array
                    items:
                      type: string
                  reason:
                    type: string
                  improvement:
                    type: string
                required:
                  - title
                  - severity
                  - files
                  - reason
                  - improvement
            next_action:
              type: object
              additionalProperties: false
              properties:
                command:
                  type: string
                reason:
                  type: string
              required:
                - command
                - reason
          required:
            - repo_summary
            - workflow_state
            - weak_points
            - next_action

tests:
  - assert:
      - type: contains-json
      - type: javascript
        value: |
          const obj = typeof output === 'string' ? JSON.parse(output) : output;
          const wf = obj.workflow_state || {};
          const weakPoints = Array.isArray(obj.weak_points) ? obj.weak_points : [];
          const nextAction = obj.next_action || {};
          const evidence = Array.isArray(wf.evidence_files) ? wf.evidence_files : [];
          const findingFiles = weakPoints.flatMap((item) => Array.isArray(item.files) ? item.files : []);
          const groundedFiles = [...new Set([...evidence, ...findingFiles])];
          const grounded =
            groundedFiles.includes('.opencode/plans/current-phase.md') &&
            groundedFiles.includes('.opencode/backlog/candidates.yaml');

          return {
            pass:
              grounded &&
              weakPoints.length >= 2 &&
              typeof nextAction.command === 'string' &&
              nextAction.command.trim().length > 0,
            reason: `grounded=${grounded}; weak_points=${weakPoints.length}; next_action=${nextAction.command || 'missing'}`
          };

evaluateOptions:
  maxConcurrency: 1
YAML

node <<'NODE'
const fs = require('fs');
const path = 'package.json';
const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));

pkg.scripts = {
  ...pkg.scripts,
  "test:web": "pnpm --dir apps/web test",
  "workflow:audit:deterministic": "bash scripts/audit-workflow-state.sh",
  "workflow:audit:agent": "promptfoo eval -c promptfooconfig.workflow.yaml --no-cache",
  "workflow:audit:agent:repeat": "promptfoo eval -c promptfooconfig.workflow.yaml --no-cache --repeat 3",
  "workflow:audit:view": "promptfoo view",
  "workflow:audit": "pnpm workflow:audit:deterministic && pnpm workflow:audit:agent"
};

fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
NODE

pnpm add -D promptfoo @opencode-ai/sdk

echo
echo "Installed LabFlowDeck workflow audit harness."
echo "Run:"
echo "  pnpm workflow:audit"
echo "  pnpm workflow:audit:agent:repeat"
echo "  pnpm workflow:audit:view"

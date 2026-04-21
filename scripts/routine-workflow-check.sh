#!/usr/bin/env bash
set -euo pipefail

bash scripts/validate-current-phase-structure.sh
bash scripts/audit-workflow-state.sh
node scripts/generate-workflow-brief.mjs
node scripts/workflow-cost-audit.mjs > workflow-cost-report.json

echo "Wrote .opencode/workflow-brief.md"
echo "Wrote workflow-cost-report.json"

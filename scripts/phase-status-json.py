#!/usr/bin/env python3
from pathlib import Path
import json
import re

phase_path = Path(".opencode/plans/current-phase.md")
backlog_path = Path(".opencode/backlog/candidates.yaml")

phase = phase_path.read_text()
backlog = backlog_path.read_text()

def line_value(label: str):
    m = re.search(rf'^{re.escape(label)}:\s*(.+)$', phase, re.MULTILINE)
    return m.group(1).strip() if m else None

candidate_id = line_value("Candidate ID")
current_status = line_value("Status")
current_status_norm = current_status.lower() if current_status else None

candidate_block = None
if candidate_id:
    m = re.search(
        rf'(?ms)^  - id: {re.escape(candidate_id)}\n(.*?)(?=^  - id: |\Z)',
        backlog
    )
    candidate_block = m.group(0) if m else None

backlog_exists = candidate_block is not None
backlog_completed = bool(candidate_block and re.search(r'(?m)^    status:\s*completed$', candidate_block))

task_open = task_done = 0
accept_open = accept_done = 0
missing_evidence = 0

task_section = re.search(r'(?ms)^## Task checklist$\n(.*?)(?=^## |\Z)', phase)
if task_section:
    for line in task_section.group(1).splitlines():
        if re.match(r'^- \[ \] ', line):
            task_open += 1
        elif re.match(r'^- \[x\] ', line, re.I):
            task_done += 1

accept_section = re.search(r'(?ms)^## Acceptance criteria checks$\n(.*?)(?=^## |\Z)', phase)
if accept_section:
    block = accept_section.group(1)
    for line in block.splitlines():
        if re.match(r'^- \[ \] ', line):
            accept_open += 1
        elif re.match(r'^- \[x\] ', line, re.I):
            accept_done += 1
    for ev in re.findall(r'(?m)^Evidence:\s*(.*)$', block):
        if ev.strip().lower() in {"", "pending", "none", "tbd"}:
            missing_evidence += 1
else:
    # if required section is missing, treat as evidence gap
    if "Acceptance criteria" in phase:
        missing_evidence += 1

drift = False
warnings = []

if not candidate_id:
    drift = True
    warnings.append("missing_candidate_id")
if candidate_id and not backlog_exists:
    drift = True
    warnings.append("candidate_missing_from_backlog")
if current_status_norm == "completed" and not backlog_completed:
    drift = True
    warnings.append("current_phase_completed_but_backlog_not_reconciled")
if current_status_norm != "completed" and backlog_completed:
    drift = True
    warnings.append("backlog_completed_but_phase_still_active")

required_sections = [
    "## Selection evidence",
    "## Task checklist",
    "## Acceptance criteria checks",
    "## Validation",
    "## Completion summary",
]
missing_sections = [s for s in required_sections if s not in phase]
if missing_sections:
    warnings.append("missing_required_sections")

result = {
    "candidate_id": candidate_id,
    "current_phase_status": current_status_norm,
    "backlog_candidate_exists": backlog_exists,
    "backlog_marks_candidate_completed": backlog_completed,
    "drift_detected": drift,
    "open_task_count": task_open,
    "completed_task_count": task_done,
    "open_acceptance_count": accept_open,
    "completed_acceptance_count": accept_done,
    "missing_evidence_count": missing_evidence,
    "missing_sections": missing_sections,
    "warnings": warnings,
}
print(json.dumps(result, indent=2))

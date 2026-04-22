#!/usr/bin/env python3
from pathlib import Path
import json
import re

phase_path = Path(".opencode/plans/current-phase.md")
backlog_path = Path(".opencode/backlog/candidates.yaml")
archive_root = Path(".opencode")

phase = phase_path.read_text()
backlog = backlog_path.read_text()


def line_value(label: str):
    match = re.search(rf"^\s*{re.escape(label)}:\s*(.+)$", phase, re.MULTILINE)
    return match.group(1).strip() if match else None


def section_body(text: str, heading: str):
    match = re.search(rf"(?ms)^## {re.escape(heading)}\s*$\n(.*?)(?=^## |\Z)", text)
    return match.group(1) if match else None


def count_checklist_items(block: str | None):
    open_count = 0
    done_count = 0
    if not block:
        return open_count, done_count
    for line in block.splitlines():
        if re.match(r"^- \[ \] ", line):
            open_count += 1
        elif re.match(r"^- \[[xX]\] ", line):
            done_count += 1
    return open_count, done_count


def find_candidate_block(candidate_id: str | None):
    if not candidate_id:
        return None
    match = re.search(
        rf"(?ms)^  - id: {re.escape(candidate_id)}\n(.*?)(?=^  - id: |\Z)",
        backlog,
    )
    return match.group(0) if match else None


def parse_evidence_refs(candidate_block: str | None):
    if not candidate_block:
        return []
    refs = []
    in_refs = False
    for line in candidate_block.splitlines():
        if re.match(r"^    evidence_refs:\s*$", line):
            in_refs = True
            continue
        if in_refs:
            if re.match(r"^      - ", line):
                refs.append(line.split("- ", 1)[1].strip())
                continue
            if re.match(r"^    [A-Za-z_]+:", line):
                break
    return refs


def archive_candidates(candidate_id: str | None):
    if not candidate_id:
        return []
    results = []
    for path in archive_root.rglob("*.md"):
        if path == phase_path:
            continue
        normalized = path.as_posix()
        if not any(
            marker in normalized for marker in ("/history/", "/archive/", "/completed/")
        ):
            continue
        try:
            content = path.read_text()
        except Exception:
            continue
        if re.search(
            rf"^Candidate ID:\s*{re.escape(candidate_id)}\s*$", content, re.MULTILINE
        ):
            results.append(normalized)
    return sorted(results)


candidate_id = line_value("Candidate ID")
raw_status = line_value("Status")
current_status = raw_status.lower() if raw_status else None
candidate_block = find_candidate_block(candidate_id)
backlog_exists = candidate_block is not None
backlog_completed = bool(
    candidate_block and re.search(r"(?m)^    status:\s*completed$", candidate_block)
)

task_block = section_body(phase, "Task checklist")
acceptance_block = section_body(phase, "Acceptance criteria checks")

task_open, task_done = count_checklist_items(task_block)
accept_open, accept_done = count_checklist_items(acceptance_block)

required_sections = [
    "## Selection evidence",
    "## Task checklist",
    "## Acceptance criteria checks",
    "## Validation",
    "## Completion summary",
]
missing_sections = [section for section in required_sections if section not in phase]

missing_evidence_count = 0
if acceptance_block is not None:
    acceptance_items = [
        line
        for line in acceptance_block.splitlines()
        if re.match(r"^- \[[xX]\] ", line)
    ]
    evidence_values = [
        match.group(1).strip()
        for match in re.finditer(r"(?m)^\s*Evidence:\s*(.*)$", acceptance_block)
    ]
    nonempty_evidence = [
        value
        for value in evidence_values
        if value and value.lower() not in {"pending", "none", "tbd"}
    ]
    placeholder_evidence = len(evidence_values) - len(nonempty_evidence)
    missing_evidence_count = (
        max(0, len(acceptance_items) - len(nonempty_evidence)) + placeholder_evidence
    )

warnings: list[str] = []
drift_detected = False
next_action = None

if not candidate_id:
    warnings.append("missing_candidate_id")
    drift_detected = True
if candidate_id and not backlog_exists:
    warnings.append("candidate_missing_from_backlog")
    drift_detected = True
if current_status == "completed" and not backlog_completed:
    warnings.append("current_phase_completed_but_backlog_not_reconciled")
    drift_detected = True
if current_status and current_status != "completed" and backlog_completed:
    warnings.append("backlog_completed_but_phase_still_active")
    drift_detected = True
if missing_sections:
    warnings.append("missing_required_sections")

archive_required = current_status == "completed"
archive_paths = archive_candidates(candidate_id)
archive_exists = bool(archive_paths)
archive_path = archive_paths[-1] if archive_paths else None
candidate_evidence_refs = parse_evidence_refs(candidate_block)
backlog_references_archive = bool(
    archive_path
    and any(
        ref == archive_path or ref.startswith(f"{archive_path}:")
        for ref in candidate_evidence_refs
    )
)

reported_status = current_status
if archive_required and (not archive_exists or not backlog_references_archive):
    drift_detected = True
    reported_status = "blocked"
    warnings.append("completed_phase_archive_missing_or_unreferenced")
    next_action = {
        "command": "/finish-phase",
        "reason": "Archive completion is required before any later phase advancement.",
    }

result = {
    "candidate_id": candidate_id,
    "current_phase_status": reported_status,
    "backlog_candidate_exists": backlog_exists,
    "backlog_marks_candidate_completed": backlog_completed,
    "drift_detected": drift_detected,
    "open_task_count": task_open,
    "completed_task_count": task_done,
    "open_acceptance_count": accept_open,
    "completed_acceptance_count": accept_done,
    "missing_evidence_count": missing_evidence_count,
    "missing_sections": missing_sections,
    "warnings": warnings,
    "archive_required": archive_required,
    "archive_exists": archive_exists,
    "archive_path": archive_path,
    "backlog_references_archive": backlog_references_archive,
}
if next_action is not None:
    result["next_action"] = next_action

print(json.dumps(result, indent=2))

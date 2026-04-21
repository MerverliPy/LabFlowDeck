#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
from pathlib import Path

def replace_once(text: str, old: str, new: str, file_name: str) -> str:
    if old not in text:
        raise SystemExit(f"Expected block not found in {file_name}")
    return text.replace(old, new, 1)

# ---------------------------
# AGENTS.md
# ---------------------------
agents_path = Path("AGENTS.md")
agents = agents_path.read_text()

if "## README update gate" not in agents:
    agents = replace_once(
        agents,
        "## MCP and tool policy\n",
        """## README update gate
At the end of every phase, make an explicit README decision:

- `README_REQUIRED` if the phase changes shipped routes, visible shell behavior, auth/session behavior, persistence status, host/deploy/workflow capabilities, setup or operator guidance, or any claim about what is implemented versus placeholder-only.
- `README_NOT_NEEDED` only if the phase is internal-only and does not change runtime truth, user-visible behavior, setup guidance, or implementation claims.

If `README_REQUIRED`, update `README.md` in the same phase unless the user explicitly says not to. If `README_NOT_NEEDED`, record a one-line reason in the phase completion summary or validation notes.

## MCP and tool policy
""",
        "AGENTS.md",
    )

agents_path.write_text(agents)

# ---------------------------
# builder.md
# ---------------------------
builder_path = Path(".opencode/agents/builder.md")
builder = builder_path.read_text()

if "## README gate" not in builder:
    builder = replace_once(
        builder,
        "## Validation behavior\n",
        """## README gate
Before finishing the phase, explicitly decide whether the phase requires a README update.

Use `README_REQUIRED` when the change affects:
- shipped routes or implemented surfaces,
- auth or session behavior,
- persistence, host, deploy, activity, or workflow capabilities,
- setup, operator guidance, or environment expectations,
- claims about what is live, simulated, placeholder-only, or out of scope.

Use `README_NOT_NEEDED` only when the phase is internal-only and does not change repo truth for users or operators.

If `README_REQUIRED`, update `README.md` in the same phase. If not updated, report the blocker explicitly.

## Validation behavior
""",
        ".opencode/agents/builder.md",
    )

if "- `README_CHECK` with either `README_REQUIRED` or `README_NOT_NEEDED`" not in builder:
    builder = replace_once(
        builder,
        "## Completion output\nReturn:\n- `files changed`\n- `what was implemented`\n- `validation attempted`\n- `tool evidence used`\n- `what remains out of scope`\n- `blockers or risks`\n",
        """## Completion output
Return:
- `files changed`
- `what was implemented`
- `validation attempted`
- `tool evidence used`
- `README_CHECK` with either `README_REQUIRED` or `README_NOT_NEEDED`
- `README_REASON`
- `what remains out of scope`
- `blockers or risks`
""",
        ".opencode/agents/builder.md",
    )

builder_path.write_text(builder)

# ---------------------------
# validator.md
# ---------------------------
validator_path = Path(".opencode/agents/validator.md")
validator = validator_path.read_text()

if "- README was updated when the phase changed user-visible or operator-visible repo truth." not in validator:
    validator = replace_once(
        validator,
        "## Checklist\nConfirm all of the following:\n",
        """## Checklist
Confirm all of the following:
""",
        ".opencode/agents/validator.md",
    )
    validator = replace_once(
        validator,
        "- User-facing copy does not overclaim shipped functionality.\n",
        """- User-facing copy does not overclaim shipped functionality.
- README was updated when the phase changed user-visible or operator-visible repo truth.
- If README was not updated, the builder gave a valid `README_NOT_NEEDED` reason.
""",
        ".opencode/agents/validator.md",
    )

if "- or the change should have updated README but did not." not in validator:
    validator = replace_once(
        validator,
        "## Failure standard\nReturn `FAIL` if:\n- acceptance criteria are not met,\n- validation evidence is missing for core claims,\n- the phase materially expanded scope,\n- or the change makes the repo appear more implemented than it actually is.\n",
        """## Failure standard
Return `FAIL` if:
- acceptance criteria are not met,
- validation evidence is missing for core claims,
- the phase materially expanded scope,
- the change makes the repo appear more implemented than it actually is,
- or the change should have updated README but did not.
""",
        ".opencode/agents/validator.md",
    )

validator_path.write_text(validator)

print("Updated:")
print("  AGENTS.md")
print("  .opencode/agents/builder.md")
print("  .opencode/agents/validator.md")
PY

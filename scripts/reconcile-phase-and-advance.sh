#!/usr/bin/env bash
set -euo pipefail

BACKLOG=".opencode/backlog/candidates.yaml"
PHASE=".opencode/plans/current-phase.md"

if [ ! -f "$BACKLOG" ]; then
  echo "Missing $BACKLOG" >&2
  exit 1
fi

if [ ! -f "$PHASE" ]; then
  echo "Missing $PHASE" >&2
  exit 1
fi

python3 - <<'PY'
from pathlib import Path
import re
from datetime import date

backlog_path = Path(".opencode/backlog/candidates.yaml")
phase_path = Path(".opencode/plans/current-phase.md")

backlog = backlog_path.read_text()
today = date.today().isoformat()

# 1) Reconcile stale candidate if it is still pending.
target_id = "projects-new-persist-placeholder"
if f"- id: {target_id}" not in backlog:
    raise SystemExit(f"Could not find backlog candidate: {target_id}")

pattern = re.compile(
    r"(- id: projects-new-persist-placeholder\s+"
    r"title: .*?\s+"
    r"status: )pending(\s+module: apps/web\s+priority: 36\s+files:.*?acceptance:\s+- The new project flow can save a bounded placeholder project record for the single user\.\s+- A saved project appears on /projects after reload and resolves at /projects/\[slug\]\.\s+- The flow stays out of live GitHub repo discovery, host discovery, and service auto-detection for this phase\.\s+- The web app build passes\.)",
    re.S,
)

replacement = (
    r"\1completed\n"
    f"  completion_note: Reconciled backlog state after confirming the new project flow already saves a bounded placeholder project record and redirects to the stored project detail route.\n"
    f"  validation_result: reconciled_from_repo_state\n"
    f"  completed_at: {today}\n"
    f"  evidence_refs:\n"
    f"    - apps/web/app/projects/actions.ts\n"
    f"    - apps/web/app/projects/new/page.tsx\2"
)

new_backlog, count = pattern.subn(replacement, backlog, count=1)
if count == 0:
    if "status: completed" in backlog.split("- id: projects-new-persist-placeholder", 1)[1].split("- id:", 1)[0]:
        new_backlog = backlog
    else:
        raise SystemExit("Failed to reconcile projects-new-persist-placeholder block cleanly.")

backlog_path.write_text(new_backlog)

# 2) Advance current phase to next true pending candidate.
phase_text = """# Current Phase
Status: active
Candidate ID: github-auth-shell-session

## Goal
Add a bounded GitHub login flow and session presence for the shell without claiming downstream repo integration status.

## Why this phase is next
The previous current phase is already completed. The backlog still showed `projects-new-persist-placeholder` as pending, but the repo already contains a server action that creates a placeholder project record and the new project flow explicitly states that it saves a bounded placeholder project record, so that candidate needed reconciliation instead of reselection. After reconciling that stale backlog state, `github-auth-shell-session` becomes the highest-priority eligible pending candidate.

## Selection evidence
- Evaluated candidate set: `projects-new-persist-placeholder`, `github-auth-shell-session`, `github-repo-picker-live-source`, `host-heartbeat-shell-source`, `activity-feed-live-source`.
- Excluded `projects-new-persist-placeholder` because the shipped code already implements placeholder-project persistence and redirect behavior, so it should be marked completed rather than re-run.
- Selected by backlog order rule: highest_priority eligible pending candidate after reconciliation.
- Winner: `github-auth-shell-session`.
- Expected validation command: `pnpm build:web`.

## Primary files
- `apps/web/app/login/page.tsx`
- `apps/web/app/auth/github/route.ts`
- `apps/web/app/auth/github/callback/route.ts`
- `apps/web/app/layout.tsx`
- `apps/web/lib/github-auth.ts`
- `.opencode/plans/current-phase.md`

## Expected max files changed
6

## Risk
Medium. The main risks are overstating downstream GitHub integration, handling callback failures poorly, or coupling session presence too tightly to future repo-linking behavior.

## In scope
- Single-user GitHub OAuth initiation and callback handling.
- Shell-visible session presence.
- Clear success and failure handling.
- Honest copy that does not imply live repo synchronization or broader GitHub control.

## Out of scope
- Repository picker implementation.
- Webhook sync or GitHub metadata ingestion.
- Multi-user auth.
- RBAC, team invites, or persistent user profiles.
- Any host, deploy, or workflow execution expansion.

## Task checklist
- [ ] Inspect existing login and auth shell surfaces.
- [ ] Add bounded GitHub auth route and callback handling.
- [ ] Surface session presence in the shell without overstating integration.
- [ ] Run `pnpm build:web`.
- [ ] Record validation evidence in this phase file.

## Validation command
`pnpm build:web`

## Acceptance criteria checks
- [ ] Single-user GitHub OAuth can be initiated and completed with clear success and failure handling.
- [ ] The shell can detect whether a GitHub session exists without overstating downstream repo integration.
- [ ] Unauthenticated users are guided into login from the shell.
- [ ] The web app build passes.
"""
phase_path.write_text(phase_text)

print("Reconciled backlog and advanced current phase to github-auth-shell-session.")
PY

echo "Done."
echo "Updated:"
echo "  .opencode/backlog/candidates.yaml"
echo "  .opencode/plans/current-phase.md"

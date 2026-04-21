#!/usr/bin/env bash
set -euo pipefail

BACKLOG=".opencode/backlog/candidates.yaml"

if [ ! -f "$BACKLOG" ]; then
  echo "Missing $BACKLOG" >&2
  exit 1
fi

cp "$BACKLOG" "$BACKLOG.bak"

python3 - <<'PY'
from pathlib import Path

path = Path(".opencode/backlog/candidates.yaml")
text = path.read_text()

new_block = """
- id: project-host-picker-shell-source
  title: Add a bounded host picker to the new project flow using stored host heartbeat records
  status: pending
  module: apps/web
  priority: 24
  files:
    - apps/web/app/projects/new/page.tsx
    - apps/web/app/api/hosts/list/route.ts
    - apps/web/app/projects/actions.ts
    - apps/web/lib/host-store.ts
    - apps/web/lib/project-store.ts
    - .opencode/plans/current-phase.md
  validation: |
    pnpm build:web
  acceptance:
    - The new project flow can fetch and present a bounded list of stored hosts for single-user selection.
    - The selected host identifier is saved onto the placeholder project record.
    - The phase does not add SSH execution, agent installation, or multi-host orchestration yet.
    - The web app build passes.
- id: deploy-project-link-shell
  title: Add bounded project linkage from Deploy cards into the project detail shell
  status: pending
  module: apps/web
  priority: 22
  files:
    - apps/web/app/deploy/page.tsx
    - apps/web/app/deploy/types.ts
    - apps/web/app/deploy/presentation.tsx
    - apps/web/lib/deploy-adapter.ts
    - README.md
    - .opencode/plans/current-phase.md
  validation: |
    pnpm build:web
  acceptance:
    - Deploy cards can show bounded project identity when available from the adapter seam.
    - A deploy surface can link into /projects/[slug] without implying live orchestration ownership.
    - README remains honest that Deploy is still a shell-first control surface.
    - The web app build passes.
- id: workflow-run-activity-bridge
  title: Emit bounded activity records when placeholder workflow runs are created
  status: pending
  module: apps/web
  priority: 20
  files:
    - apps/web/app/agents/actions.ts
    - apps/web/app/agents/page.tsx
    - apps/web/app/projects/[slug]/page.tsx
    - apps/web/lib/workflow-store.ts
    - apps/web/lib/activity-store.ts
    - .opencode/plans/current-phase.md
  validation: |
    pnpm build:web
  acceptance:
    - Creating a bounded manual workflow run writes a matching activity record to the activity store.
    - Project detail and workflow surfaces can render the recorded event without claiming background execution.
    - The phase stays single-user and shell-first.
    - The web app build passes.
"""

if "project-host-picker-shell-source" in text:
    raise SystemExit("Candidates already appended; no changes made.")

text = text.rstrip() + "\n" + new_block.lstrip()
path.write_text(text)
print("Appended 3 future backlog candidates to", path)
PY

echo "Done."
echo "Backup: $BACKLOG.bak"
echo "Updated: $BACKLOG"

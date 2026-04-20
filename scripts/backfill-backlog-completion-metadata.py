from pathlib import Path

path = Path(".opencode/backlog/candidates.yaml")
lines = path.read_text().splitlines()

blocks = []
current = []

for line in lines:
    if line.startswith("  - id: "):
        if current:
            blocks.append(current)
        current = [line]
    else:
        if current:
            current.append(line)
        else:
            blocks.append([line])

if current:
    blocks.append(current)

def process_block(block):
    text = "\n".join(block)
    if not text.startswith("  - id: "):
        return block, False

    if "    status: completed" not in text:
        return block, False

    changed = False

    has_validation = any(line.startswith("    validation_result:") for line in block)
    has_completed_at = any(line.startswith("    completed_at:") for line in block)
    has_evidence_refs = any(line.startswith("    evidence_refs:") for line in block)

    insert_at = None
    for i, line in enumerate(block):
        if line.startswith("    completion_note:"):
            insert_at = i + 1

    if insert_at is None:
        for i, line in enumerate(block):
            if line.startswith("    status:"):
                insert_at = i + 1
                break

    additions = []
    if not has_validation:
        additions.append("    validation_result: legacy_backfill_pending")
        changed = True
    if not has_completed_at:
        additions.append("    completed_at: legacy_backfill_pending")
        changed = True
    if not has_evidence_refs:
        additions.append("    evidence_refs: []")
        changed = True

    if changed and insert_at is not None:
        block = block[:insert_at] + additions + block[insert_at:]

    return block, changed

out = []
changed_any = False

for block in blocks:
    new_block, changed = process_block(block)
    out.extend(new_block)
    changed_any = changed_any or changed

path.write_text("\n".join(out) + "\n")

if changed_any:
    print("Backfilled completed backlog entries with validation_result, completed_at, and evidence_refs.")
else:
    print("No backlog backfill changes were needed.")

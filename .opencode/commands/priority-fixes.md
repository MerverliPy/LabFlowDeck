---
description: Drive the founder P0 credibility and alignment fixes in strict order
agent: plan
subtask: false
---

Read these files first:

- @AGENTS.md
- @README.md
- @SPEC.md
- @opencode.json
- @.opencode/backlog/candidates.yaml
- @.opencode/plans/founder-priority-fixes.md
- @.opencode/plans/current-phase.md

Goal: keep the repo honest, auditable, and safe before any new product-surface work continues.

## Required execution order

1. `patch-nextjs-security-line`
2. `reconcile-opencode-phase-state`
3. `publish-runtime-truth-readme`
4. `classify-screen-exports-reference`

## Rules

- Treat `apps/web` runtime implementation, `.opencode` workflow governance, and `screens/**` design exports as separate layers.
- Do not claim runtime functionality that is not confirmed in code.
- Keep each phase bounded, auditable, and validation-backed.
- For the Next.js phase, verify the patched target in the chosen release line before editing dependencies or lockfiles.
- Before reporting or selecting phase state, verify that the current candidate exists in backlog and is not marked `status: completed`.
- If the active phase is completed, ignore backlog candidates marked `status: completed`, select the next unresolved candidate from the ordered list, and rewrite `.opencode/plans/current-phase.md`.
- If the active phase is not completed, resume only that phase and report remaining tasks.
- Do not skip validation evidence.
- Do not expand into auth, host pairing, persistence, or new routes while these four phases are unresolved.

## Required output

Return:

- active or newly selected candidate ID
- why it is the next correct phase
- files to change
- validation command
- acceptance criteria checklist
- explicit note on what remains out of scope

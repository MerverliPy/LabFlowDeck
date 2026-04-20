# Founder Priority Fixes

Status: completed
Owner: founder
Workflow: OpenCode internal phase queue

## Objective

Resolve the founder-level credibility and alignment gaps before adding more product surface area.

## Ordered phase queue

1. `patch-nextjs-security-line`
2. `reconcile-opencode-phase-state`
3. `publish-runtime-truth-readme`
4. `classify-screen-exports-reference`

## Progress snapshot

- Completed: `patch-nextjs-security-line`, `reconcile-opencode-phase-state`, `publish-runtime-truth-readme`, `classify-screen-exports-reference`
- Next unresolved founder fix: none
- Remaining after that: none

## Exit criteria

- The active Next.js line is patched and the web app build passes.
- `.opencode/backlog/candidates.yaml` and `.opencode/plans/current-phase.md` are aligned.
- README clearly distinguishes shipped runtime implementation from placeholder and planned work.
- `screens/**` is clearly labeled as design-reference material rather than shipped runtime surface.

## Completion note

The founder credibility queue is complete. Repo-state documentation now matches the shipped shell, the screens exports are explicitly design-reference only, and phase selection can safely move back to bounded product work.

## Non-goals

- Do not add new product routes.
- Do not introduce auth, host-pairing, or persistence in this fix pack.
- Do not expand the control-plane shell into new backend integrations during these four phases.

## Operating rules

- Keep runtime implementation, workflow governance, and screen exports as separate layers.
- Prefer bounded, auditable changes over broad refactors.
- Do not claim functionality that is not confirmed in code.
- Preserve evidence for every completed phase.

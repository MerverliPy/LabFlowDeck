# Workflow Rules

## Scope

These instructions apply only to LabFlowDeck's internal workflow files, commands, agents, phase state, and repo-owned guardrails under `.opencode/` and `scripts/dev/`.

## Workflow invariants

- `.opencode/plans/current-phase.md` is the authoritative active-phase file
- `.opencode/backlog/candidates.yaml` remains the durable candidate source of truth
- a phase must not be finished or shipped without validation evidence
- backlog selection must only use entries under `candidates`
- the workflow is internal-only and must not be exposed through `apps/web` product runtime surfaces

## Protected path rules

Without explicit approval in the active phase, the workflow must not modify:
- `apps/web/**`
- `README.md`
- `SPEC.md`
- `docs/architecture/**`
- `.env.example`

When a future product-touching phase requests approval for a protected path, it should name the exact file path rather than only a broad directory.

High-risk product files are grouped by boundary type:
- Auth and GitHub boundaries:
  - `apps/web/lib/github-auth.ts`
  - `apps/web/lib/github.ts`
  - `apps/web/app/auth/github/route.ts`
  - `apps/web/app/auth/github/callback/route.ts`
- Shell state and placeholder persistence boundaries:
  - `apps/web/lib/project-store.ts`
  - `apps/web/lib/workflow-store.ts`
  - `apps/web/lib/activity-store.ts`
  - `apps/web/lib/host-store.ts`
- Deploy and host adapter boundaries:
  - `apps/web/lib/deploy-adapter.ts`
  - `apps/web/app/api/deploy/actions/route.ts`
  - `apps/web/app/api/deploy/status/route.ts`

## Agent boundaries

- orchestrator may update workflow state but must not implement product code
- builder may implement only the active phase and must stop if protected product paths would be touched without approval
- validator must not implement fixes
- reviewer must remain read-only
- shipper may summarize or prepare handoff only after evidence is present and must not push by default

## Command behavior

- commands should be small, explicit, and single-purpose
- commands should stop rather than guess when a workflow invariant fails
- commands must distinguish internal workflow validation from product runtime validation
- commands must not surface `.opencode` state through web routes, API routes, auth handlers, or README product claims

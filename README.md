# LabFlowDeck

LabFlowDeck is a **mobile-first command center for AI-assisted software delivery**. Today, the shipped runtime is still a thin Next.js control-plane shell: it demonstrates the intended mobile UX and a few bounded API contracts without claiming that live GitHub, host, auth, or deployment orchestration are fully implemented.

This repository now follows a **hybrid product + workflow** structure:

- **Product scaffold**: a minimal Next.js web app in `apps/web`
- **Workflow scaffold**: OpenCode-style agents, commands, backlog, and phase plan under `.opencode/`
- **Product source of truth**: `SPEC.md`
- **Architecture notes**: `docs/architecture/blueprint.md`

## Why this repo exists

The original repo content was a Mowgli export: a strong product specification and mockup-oriented starter. This scaffold turns that into a buildable platform repo with a delivery workflow that can incrementally ship the product.

## Current structure

- `SPEC.md` — product spec and UX scope
- `apps/web` — mobile-first platform shell
- `.opencode/agents` — role definitions for orchestrated development
- `.opencode/commands` — phase workflow commands
- `.opencode/backlog/candidates.yaml` — prioritized implementation queue
- `.opencode/plans/current-phase.md` — active implementation phase
- `AGENTS.md` — repo-level execution contract

## Workflow model

The workflow is optimized for **high-signal, low-overhead implementation**:

1. **Orchestrator** selects the next bounded phase from backlog and writes the phase plan.
2. **Builder** makes the smallest valid implementation needed to complete the phase.
3. **Validator** checks acceptance criteria and required verification evidence.
4. **Shipper** prepares final summary and commit/PR framing.

This keeps planning explicit, implementation bounded, and validation auditable.

## Current implemented surfaces

Confirmed runtime routes in `apps/web`:

- `/` — Hub shell with mobile-first status cards, quick actions, workflow summary, and recent activity
- `/projects` — Projects list shell with stacked status cards and a create-project CTA
- `/projects/new` — guided project-creation placeholder flow
- `/agents` — workflow list shell with recent run summaries
- `/agents/new` — guided workflow-creation placeholder flow
- `/deploy` — deploy control-plane shell backed by typed mock data, URL-persisted filters, refresh, and confirmation-driven simulated actions

Confirmed thin API routes in `apps/web/app/api`:

- `GET /api/health` — lightweight health payload for the web shell
- `GET /api/deploy/status` — simulated deployment status payload used by `/deploy`
- `POST /api/deploy/actions` — request validation and simulated deploy-action acceptance/rejection without real Docker control

## Not implemented yet

Placeholder UI flows that currently ship as shell-only routes:

- `/projects/new` does not browse GitHub, pair a real host, or persist a created project
- `/agents/new` does not save workflows, edit reusable steps, schedule runs, or execute agents
- `/deploy` uses a bounded adapter seam with simulated data and accepted action requests rather than live host or Docker control

Future integrations and backend work that are still absent from the runtime:

- authentication, user accounts, and access control
- real GitHub linking, repo discovery, and webhook-backed workflow activity
- real host pairing, SSH transport, and host heartbeat/storage
- persistence for projects, workflows, deployment state, or saved drafts
- background execution, streaming logs, and production-grade orchestration

The current runtime should be read as an honest mobile-first product shell, not a fully integrated control plane.

## Local start

```bash
pnpm install
pnpm dev:web
```

## Security operator note

If you deployed this app while it was pinned to an older vulnerable Next.js App Router release, redeploy after upgrading so the patched runtime is actually in service. If that unpatched runtime was internet-exposed, review access logs and rotate any secrets that may have been present in the running environment.

## Notes

This is an intentionally thin first scaffold. It establishes the repo shape, execution workflow, and a credible product shell without pretending the full platform is already implemented.

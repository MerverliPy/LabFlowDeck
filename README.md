# LabFlowDeck

LabFlowDeck is a **mobile-first command center for AI-assisted software delivery**. It is designed for iPhone-sized screens and focuses on orchestrating GitHub-linked projects, workflow agents, remote hosts, and Docker-based deployments from a clean operational control plane.

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

## Product direction

Based on `SPEC.md`, LabFlowDeck targets these core areas:

- GitHub-linked project control
- Remote host pairing and monitoring
- Agent workflow creation and execution
- Docker/Compose deployment visibility and actions
- Activity, execution logs, and mobile-friendly operational insight

## Immediate next phase

The repo is scaffolded to start with:

- a mobile-first Hub experience
- reusable platform cards and status sections
- workflow/backlog infrastructure for iterative delivery

## Local start

```bash
pnpm install
pnpm dev:web
```

## Notes

This is an intentionally thin first scaffold. It establishes the repo shape, execution workflow, and a credible product shell without pretending the full platform is already implemented.

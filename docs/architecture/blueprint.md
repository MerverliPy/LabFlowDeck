# LabFlowDeck Platform Blueprint

## Product shape

LabFlowDeck is a mobile-first operational control plane for solo builders managing GitHub-linked software projects, agent workflows, paired hosts, and Docker-based deployments.

## Repo structure

- `SPEC.md` — product behavior and screen direction
- `apps/web` — thin Next.js platform shell
- `.opencode` — workflow orchestration contract and backlog
- `docs/architecture` — implementation guidance

## Delivery architecture

### Product layer
- Hub dashboard
- Projects management
- Agent workflow panel
- Deploy panel
- settings and host management surfaces

### Workflow layer
- Orchestrator for phase selection
- Builder for bounded implementation
- Validator for evidence-backed review
- Shipper for merge-ready summaries

## Technical direction

### Frontend
- Next.js App Router
- TypeScript
- CSS-first styling optimized for mobile layouts
- progressive enhancement toward PWA behavior

### Backend direction for later phases
- GitHub OAuth and repo metadata sync
- host pairing service
- workflow execution service
- deployment/health polling adapters
- activity and execution log persistence

## Implementation principle

Do not build the full backend prematurely. Establish the control plane UX and bounded workflow delivery loop first, then add thin vertical integrations behind stable screens.

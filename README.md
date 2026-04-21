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
- `screens/` — design-reference artifacts from exported mockups, not shipped runtime routes
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

## Internal workflow provider switch

The repo's internal OpenCode workflow path can be switched manually between OpenAI and GitHub Copilot without hand-editing multiple files:

```

`LABFLOWDECK_SESSION_SECRET` signs the app session cookies and should not reuse `GITHUB_CLIENT_SECRET`.
bash
pnpm workflow:provider -- openai
pnpm workflow:provider -- copilot
pnpm workflow:provider -- current
pnpm workflow:provider -- copilot --dry-run
```

This affects the repo's internal workflow tooling that reads `opencode.json` (for example the OpenCode audit path and promptfoo workflow setup that depends on that config). It does **not** change the shipped `apps/web` product behavior.

Copilot mode currently uses the same verified Copilot model for both `model` and `small_model` slots so the internal workflow stays on one provider until a smaller Copilot-specific fallback is explicitly verified.

## Design references

The `screens/` directory contains design-reference exports from the earlier mockup workflow. They are useful for visual guidance, but they should not be read as proof that equivalent `apps/web` runtime routes, backend integrations, or completed product flows already ship today.

## Current implemented surfaces

Confirmed runtime routes in `apps/web`:

- `/` — Hub shell with mobile-first status cards, quick actions, workflow summary, bounded stored activity events, and bounded stored host heartbeat summaries
- `/login` — bounded single-user GitHub login page with clear success and failure states for shell session presence
- `/projects` — Projects list shell with stacked status cards and a create-project CTA
- `/projects/[slug]` — project detail overview shell with repository, host, workflow, deployment, and bounded stored activity summaries
- `/projects/new` — guided project-creation placeholder flow
- `/agents` — workflow list shell backed by a bounded reusable workflow store plus manual placeholder run-history recording
- `/agents/new` — guided workflow-creation flow that saves bounded reusable workflow records for the single-user shell
- `/deploy` — deploy control-plane shell backed by a bounded adapter seam, URL-persisted filters, refresh, confirmation-driven actions, and project-detail links when deployment records can be matched to stored project shells

Confirmed thin API routes in `apps/web/app/api`:

- `GET /api/health` — lightweight health payload for the web shell
- `GET /api/deploy/status` — simulated deployment status payload used by `/deploy`
- `POST /api/deploy/actions` — request validation and simulated deploy-action acceptance/rejection without real Docker control
- `GET /api/github/repos` — bounded GitHub repository list payload for the authenticated project-creation flow
- `GET /api/hosts/heartbeat` — bounded stored host heartbeat payload used for honest Hub and project host-status summaries
- `GET /api/hosts/list` — bounded stored host list payload used by the project-creation host picker shell

Confirmed auth flow routes in `apps/web/app/auth`:

- `GET /auth/github` — initiates a bounded GitHub OAuth flow for the single-user shell session
- `GET /auth/github/callback` — completes the GitHub OAuth callback, establishes signed shell session presence, and returns to `/login`

## Not implemented yet

Placeholder UI flows that currently ship as shell-only routes:

- `/projects/new` can load a bounded live GitHub repository list for a signed-in user, present stored host heartbeat choices, and save those selections into the placeholder project record, but it still does not browse file trees or pair a real host
- `/projects/[slug]` can show bounded stored host heartbeat and activity state, but it still does not browse repository files, stream runtime logs, or execute live workflow/deploy controls
- `/agents` and `/agents/new` can save bounded reusable workflow records and record manual placeholder run history, but they still do not edit reusable steps, run background jobs, or execute live agents
- `/deploy` uses a bounded adapter seam with accepted action requests and project-shell links, rather than live host or Docker control
- `/login` can establish single-user GitHub session presence when OAuth environment variables are configured, but broader GitHub sync and control remain out of scope

Future integrations and backend work that are still absent from the runtime:

- multi-user auth, broader user-account management, and access control
- live GitHub file browsing, deeper metadata sync, and webhook-backed workflow activity beyond the bounded login and repo-picker shell
- real host pairing, SSH transport, and broader agent-backed host heartbeat ingestion beyond the bounded stored heartbeat shell source
- broad persistence beyond the bounded placeholder project store, including workflows, deployment state, and saved drafts
- background execution, streaming logs, and production-grade orchestration

The current runtime should be read as an honest mobile-first product shell, not a fully integrated control plane.

## Local start

```bash
pnpm install
pnpm dev:web
```

## Optional GitHub OAuth setup

To enable the bounded GitHub login flow, configure these environment variables before running the web app:

`LABFLOWDECK_SESSION_SECRET` signs the app session cookies and should not reuse `GITHUB_CLIENT_SECRET`.

```bash
LABFLOWDECK_SESSION_SECRET=your_long_random_session_secret
GITHUB_CLIENT_ID=your_github_oauth_app_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_app_client_secret
GITHUB_OAUTH_SCOPE=read:user repo
```

The default OAuth request now supports the bounded repo picker by asking GitHub for user identity plus repository access needed to list selectable repos for the single-user shell.

Without these variables, `/login` still renders and the shell explains that GitHub auth is unavailable instead of claiming a live session.

## Security operator note

If you deployed this app while it was pinned to an older vulnerable Next.js App Router release, redeploy after upgrading so the patched runtime is actually in service. If that unpatched runtime was internet-exposed, review access logs and rotate any secrets that may have been present in the running environment.

## Notes

This is an intentionally thin first scaffold. It establishes the repo shape, execution workflow, and a credible product shell without pretending the full platform is already implemented.

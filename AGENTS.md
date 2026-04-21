# AGENTS.md

> Internal workflow provider switch reminder: see `README.md` → `## Internal workflow provider switch` for the manual `pnpm workflow:provider -- openai|copilot|current` commands.

## Mission
Build LabFlowDeck into a mobile-first operational control plane for AI-assisted software delivery, aligned to `SPEC.md`, while keeping the shipped runtime honest about what is and is not live.

## Source of truth
Read these in order when planning or implementing work:
1. `SPEC.md`
2. `README.md`
3. `.opencode/backlog/candidates.yaml`
4. `.opencode/plans/current-phase.md`
5. Relevant files in `apps/web` or `.opencode`

## Repo truth
- Treat the current product as a credible mobile-first shell, not a fully integrated control plane.
- Do not claim that GitHub linking, auth, host pairing, persistence, background execution, or live deployment orchestration are implemented unless the code and validation prove that they are.
- Keep README and user-facing copy honest about shell-only or simulated behavior.
- Prefer single-module, bounded phases over broad multi-surface expansion.
- Respect the backlog constraints, especially bounded file count and clear validation.

## README update gate
At the end of every phase, make an explicit README decision:

- `README_REQUIRED` if the phase changes shipped routes, visible shell behavior, auth/session behavior, persistence status, host/deploy/workflow capabilities, setup or operator guidance, or any claim about what is implemented versus placeholder-only.
- `README_NOT_NEEDED` only if the phase is internal-only and does not change runtime truth, user-visible behavior, setup guidance, or implementation claims.

If `README_REQUIRED`, update `README.md` in the same phase unless the user explicitly says not to. If `README_NOT_NEEDED`, record a one-line reason in the phase completion summary or validation notes.

## MCP and tool policy
When available, prefer tools in this order:
- Use `github` first for workflow failures, CI state, open pull requests, issues, and recent repo activity.
- Use `context7` before making Next.js, React, TypeScript, routing, or framework-sensitive changes.
- Use `playwright` after UI or route changes to verify the rendered result.
- Use Docker MCP tools for container, runtime, or environment diagnosis.
- Do not use MCPs just to restate information already available from local repo files.

## Phase policy
- The backlog is authoritative for next-phase selection unless the user explicitly overrides scope.
- Ignore candidates marked completed or otherwise ineligible.
- Prefer the smallest safe task with the clearest validation path.
- Prefer a same-module follow-up when it reduces integration risk.
- Avoid speculative backend expansion when a shell-aligned vertical slice is available.
- Do not store workflow state in ad hoc memory files.

## Backlog exhaustion rule
If there are no eligible backlog candidates:
- Do not silently revive completed candidates.
- Do not invent a broad refactor.
- Return `BACKLOG_REFRESH_NEEDED`.
- Propose up to 3 bounded candidate entries grounded in `SPEC.md`, `README.md`, current code shape, and GitHub evidence if available.
- Keep each proposed candidate small, auditable, and aligned to the current product boundaries.

## Product boundaries for near-term work
In scope:
- Mobile-first shell quality in `apps/web`
- Honest status, workflow, deploy, host, logs, and project-detail surfaces
- Thin route handlers and bounded adapter seams
- Small tests for shell behavior
- Workflow hygiene under `.opencode`

Out of scope unless explicitly requested by the phase:
- Full backend orchestration engine
- Full SSH transport implementation
- Production-grade Docker control plane
- Team collaboration and RBAC
- Broad persistence layer rollout
- Multi-provider abstraction beyond GitHub-first assumptions

## Output standard
All agents must:
- Ground claims in actual file changes and validation evidence
- Distinguish clearly between implemented behavior and placeholder behavior
- Call out residual risk and out-of-scope work explicitly

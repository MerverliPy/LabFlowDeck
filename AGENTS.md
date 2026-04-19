# AGENTS.md

## Mission

Build LabFlowDeck into a mobile-first operational control plane for AI-assisted software delivery, based on `SPEC.md`.

## Primary execution loop

- Orchestrator chooses the next bounded phase.
- Builder implements the smallest viable change for that phase.
- Validator checks the acceptance criteria and verification evidence.
- Shipper prepares final summary and merge-ready framing.

## Source of truth

- `SPEC.md` defines product behavior and mobile UX direction.
- Existing mockups and design exports should guide layout and visual hierarchy.
- `.opencode/backlog/candidates.yaml` defines prioritized implementation candidates.
- `.opencode/plans/current-phase.md` is the only active phase state file.

## Repo priorities

1. Preserve alignment with `SPEC.md`.
2. Prefer mobile-first UX over desktop abstractions.
3. Keep each phase bounded and auditable.
4. Favor single-module changes when possible.
5. Do not invent large backend surfaces before the UI shell and workflow control plane are coherent.

## Rules

- Do not store workflow state in ad hoc memory files.
- Keep implementation phases concrete and validation-oriented.
- Prefer one meaningful vertical slice at a time.
- Update the backlog when scope or priority changes.
- Avoid speculative multi-module refactors.

## Product boundaries for near-term phases

In scope:
- Hub, Projects, Agents, and Deploy shell
- status cards and mobile-first layout
- workflow selection and run-monitoring surfaces
- host, deployment, and activity summaries
- thin health/status route for the web app

Out of scope for early phases:
- full backend orchestration engine
- full SSH implementation
- production-grade Docker control plane
- team collaboration and RBAC
- multi-provider abstraction beyond GitHub-first assumptions

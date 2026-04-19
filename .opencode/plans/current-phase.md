# Current Phase

Status: completed
Candidate ID: hub-mobile-shell

## Goal

Build the first mobile Hub shell for LabFlowDeck so the repo has a real product surface instead of only a specification export.

## Why this phase is next

The Hub is the default landing experience in `SPEC.md` and provides the fastest path to a visible, product-shaped shell.

## Primary files

- apps/web/app/page.tsx
- apps/web/app/globals.css

## Expected max files changed

4

## Risk

Low. This is a contained frontend scaffold phase.

## Rollback note

Revert the new `apps/web` scaffold if needed without affecting the original spec files.

## In scope

- Hub header
- system status card
- quick actions section
- workflow summary cards
- hosts and deployments summary
- activity feed shell

## Out of scope

- live backend data
- authentication
- host pairing logic
- deployment execution
- workflow runtime engine

## Tasks

- Create the web app scaffold.
- Implement the Hub page shell.
- Add mobile-first dark theme styles.
- Add minimal app metadata and health route.

## Validation command

pnpm build:web

## Validation

passed — `pnpm build:web`

## Acceptance criteria

- Home page renders a coherent mobile-first command center.
- The shell reflects the core Hub concepts from `SPEC.md`.
- The repo contains a minimal runnable web app structure.

## Completion summary

Mobile-first Hub shell is present in `apps/web/app/page.tsx` with the planned status, quick action, workflow, host/deploy, and activity sections. Minimal app metadata and a thin health route are in place, the web app builds successfully, and all listed acceptance criteria are met. Phase is ready for `/ship-phase`.

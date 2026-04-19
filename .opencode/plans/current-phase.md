# Current Phase

Status: completed
Candidate ID: patch-nextjs-security-line

## Goal

Patch the Next.js release line used by the web app, regenerate the lockfile, and document the required operator guidance so the repo no longer carries a known framework-security credibility gap.

## Why this phase is next

This is the highest-priority founder fix. It removes the most immediate security and credibility issue before further shell or documentation work continues.

## Primary files

- apps/web/package.json
- pnpm-lock.yaml
- README.md

## Expected max files changed

3

## Risk

Medium. Dependency upgrades can break build behavior even on patch/minor transitions, so the work must stay tightly scoped and validation-backed.

## In scope

- Verify the currently installed Next.js release line.
- Upgrade to a patched target in the same release line unless a deliberate major upgrade is chosen.
- Regenerate the lockfile.
- Confirm the web app still builds.
- Add a concise README operator note for redeploy and post-patch secret-rotation guidance if the app was exposed while unpatched.

## Out of scope

- Major framework migration work.
- Feature development.
- Auth, host, or provider integration.
- Any new product routes or runtime surfaces.

## Tasks

- Confirm the current `apps/web` Next.js version.
- Select the patched target version for the active release line.
- Update dependency and lockfile.
- Run the web build.
- Add the README operator note without overstating implementation maturity.

## Validation command

node -p "require('./apps/web/package.json').dependencies.next" && pnpm install --frozen-lockfile=false && pnpm build:web

## Acceptance criteria

- The repo no longer pins a Next.js version known to be vulnerable for the active App Router security advisories.
- The lockfile is regenerated from the patched dependency target.
- `pnpm build:web` passes.
- README contains a short operator note on redeploy and secret rotation if the app was exposed while unpatched.

## Completion summary

Completed.

- Updated `apps/web` from `next@15.2.4` to `next@15.5.15`, which satisfies the currently reported patched 15.x advisory floor from `pnpm audit --prod`.
- Regenerated `pnpm-lock.yaml` against `15.5.15`.
- Added the required README operator note covering redeploy and secret-rotation guidance for previously exposed unpatched runtimes.
- Validation passed:
  - `node -p "require('./apps/web/package.json').dependencies.next"` → `15.5.15`
  - `pnpm install --frozen-lockfile=false`
  - `pnpm audit --prod` → `No known vulnerabilities found`
  - `pnpm build:web` → passed

Non-blocking note: `pnpm build:web` emitted a Next.js workspace-root warning because an additional `/home/calvin/package-lock.json` exists outside this repo.

# Screens design reference exports

The files in this directory are **design-reference artifacts**, not shipped runtime routes.

They came from the original mockup/export workflow and should be read as visual source material for layout, hierarchy, and interaction intent.

## What these files are for

- preserving the original mobile-first screen concepts from the product spec era
- guiding implementation details in `apps/web`
- helping compare runtime work against the intended visual direction

## What these files are not

- they are not wired into the Next.js app router
- they are not the source of truth for shipped behavior
- they do not imply that matching backend integrations, persistence, auth, or host control already exist

For the actual implemented runtime surfaces, use the root `README.md` and inspect `apps/web`.

# /ship-phase

Prepare the completed phase for commit or PR handoff.

## Required behavior

- Refuse to run unless the active phase status is `completed`.
- Refuse to run unless backlog reconciliation has already succeeded.
- Refuse to run unless the completed phase has been archived into `.opencode/plans/history/`.
- Summarize:
  - candidate ID
  - shipped change
  - validation result
  - evidence refs
  - suggested commit message
  - suggested PR summary

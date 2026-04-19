# /phase-status

Inspect `.opencode/plans/current-phase.md` and report:

- current candidate ID
- whether that candidate exists in `.opencode/backlog/candidates.yaml`
- whether backlog marks that candidate as `status: completed`
- goal
- status
- remaining tasks
- validation status
- acceptance criteria state

If the candidate ID in the current phase file does not exist in backlog candidates, report `FAIL: backlog/current-phase drift` before anything else.

If the candidate exists in backlog but is marked `status: completed`, report `FAIL: completed candidate still active` before anything else.

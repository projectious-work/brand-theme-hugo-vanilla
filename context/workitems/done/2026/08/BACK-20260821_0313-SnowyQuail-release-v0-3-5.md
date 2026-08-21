---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260821_0313-SnowyQuail-release-v0-3-5
  created: '2026-08-21T03:13:47+00:00'
  updated: '2026-08-21T08:02:40+00:00'
spec:
  title: Release v0.3.5
  state: done
  type: chore
  priority: high
  description: Commit and merge all outstanding repository changes, curate the v0.3.5
    changelog, add v0.3.5 to current and archived documentation version menus, pass
    doctor/release/browser gates, publish the tag and GitHub Release, deploy gh-pages,
    then prune worktrees and unused branches.
  started_at: '2026-08-21T03:13:59+00:00'
  completed_at: '2026-08-21T08:02:40+00:00'
---

## Transition note (2026-08-21T03:13:59+00:00)

Patch release workflow started; outstanding repository reconciliation reviewed.


## Transition note (2026-08-21T08:02:29+00:00)

v0.3.5 tag and GitHub Release verified; archive/checksum published; gh-pages updated with v0.3.4 archive; auxiliary worktrees and unused branches removed.


## Transition note (2026-08-21T08:02:40+00:00)

Release complete: main a524a0f, tag v0.3.5, GitHub Release and assets verified, gh-pages 1574d8d deployed, only main worktree/local branch and required origin main/gh-pages remain.

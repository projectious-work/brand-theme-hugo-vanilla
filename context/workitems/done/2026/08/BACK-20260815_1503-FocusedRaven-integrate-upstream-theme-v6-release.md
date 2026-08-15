---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260815_1503-FocusedRaven-integrate-upstream-theme-v6-release
  created: '2026-08-15T15:03:13+00:00'
  updated: '2026-08-15T15:05:26+00:00'
spec:
  title: Integrate and verify upstream Hugo theme v6
  state: done
  type: task
  priority: high
  description: Import supplied v6 into src, preserve repository-owned scripts and
    local corrections, validate the nine upstream claims, and run full deterministic/browser/security
    verification.
  started_at: '2026-08-15T15:05:26+00:00'
  completed_at: '2026-08-15T15:05:26+00:00'
---

## Transition note (2026-08-15T15:05:26+00:00)

Imported v6 while preserving release-note accuracy and repository-owned corrections.


## Transition note (2026-08-15T15:05:26+00:00)

Verified all nine upstream fixes in source and generated output; corrected the reintroduced notebook example warning and stale announcement text.


## Transition note (2026-08-15T15:05:26+00:00)

V6 integration complete: deterministic verification passes, 8 browser tests pass with two viewport skips, npm audit is clean, and the watcher is ready for restart.

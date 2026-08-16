---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260816_1245-IdealFlute-integrate-upstream-hugo-theme-v7
  created: '2026-08-16T12:45:38+00:00'
  updated: '2026-08-16T14:05:07+00:00'
spec:
  title: Integrate upstream Hugo theme v7
  state: done
  type: task
  priority: high
  description: Verify the sidebar/TOC navigation corrections, synchronize the reworked
    three-mode brand colors and new public API/icon/asciinema features, then run deterministic
    builds and browser tests.
  scope: Compare and integrate v7 theme implementation while preserving project-specific
    content, release tooling, tests, and prior local alignment decisions.
  started_at: '2026-08-16T12:46:26+00:00'
  completed_at: '2026-08-16T14:05:07+00:00'
---

## Transition note (2026-08-16T12:46:26+00:00)

Audited v7. Integrating new assets and fixes selectively because its example content and some templates predate project-specific corrections already on main.


## Transition note (2026-08-16T14:03:41+00:00)

Integrated v7 selectively, preserved newer local fixes, added navigation/three-mode/icon/token contracts, and passed full verification with artifact 1e491e0339aa56442c6319d6e3d0f13bd9c53c56c82dcb9331935867db8f8db1.


## Transition note (2026-08-16T14:05:07+00:00)

Integrated upstream v7 selectively, preserved newer local implementation fixes, added tests for navigation state and palette semantics, and verified the complete build/browser suite plus the live port-1312 watcher.

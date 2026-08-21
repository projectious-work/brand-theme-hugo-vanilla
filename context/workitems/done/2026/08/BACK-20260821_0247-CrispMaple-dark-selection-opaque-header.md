---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260821_0247-CrispMaple-dark-selection-opaque-header
  created: '2026-08-21T02:47:54+00:00'
  updated: '2026-08-21T03:07:49+00:00'
spec:
  title: Fix dark selection contrast and opaque header
  state: done
  type: bug
  priority: medium
  description: Deep-dark and navy-dark text selections use an unreadable brown/dark
    pairing, and the sticky header allows scrolling content to show through. Use accessible
    selection colors, make the header opaque, add browser regression coverage, and
    publish the updated documentation.
  started_at: '2026-08-21T03:07:14+00:00'
  completed_at: '2026-08-21T03:07:49+00:00'
---

## Transition note (2026-08-21T03:07:14+00:00)

Implementation verified and merged in PR #59; GitHub Pages deployment underway/completed.


## Transition note (2026-08-21T03:07:35+00:00)

PR #59 is merged; full verification and live deployment checks passed.


## Transition note (2026-08-21T03:07:49+00:00)

Merged PR #59 to main as 51f0651, deployed gh-pages commit ee95417, and verified the live CSS contains opaque header and accessible selection tokens.

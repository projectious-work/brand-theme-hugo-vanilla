---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260815_0625-PromptWolf-integrate-theme-v4-publish-release
  created: '2026-08-15T06:25:10+00:00'
  updated: '2026-08-15T06:41:31+00:00'
spec:
  title: Integrate Hugo theme v4 and publish v0.3.0
  state: done
  type: task
  priority: high
  description: Integrate the supplied v4 theme while preserving the pinned-CDN and
    local-release decisions; verify, merge, tag, publish, deploy, and validate v0.3.0.
  started_at: '2026-08-15T06:25:13+00:00'
  completed_at: '2026-08-15T06:41:31+00:00'
---

## Transition note (2026-08-15T06:25:13+00:00)

V4 integration and local verification complete; proceeding through protected-main release publication.


## Transition note (2026-08-15T06:41:26+00:00)

Release completed and externally verified; entering final review and closure.


## Transition note (2026-08-15T06:41:31+00:00)

Final release verification passed: Git tag and GitHub Release v0.3.0 exist, archive includes LICENSE/CHANGELOG, and GitHub Pages returns HTTP 200.

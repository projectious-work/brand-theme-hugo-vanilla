---
apiVersion: processkit.projectious.work/v1
kind: Migration
metadata:
  id: MIG-20260817_1827-RuntimeSync-aibox-runtime
  created: 2026-08-17 18:27:59+00:00
  updated: '2026-08-18T10:15:36+00:00'
spec:
  source: aibox-runtime-home
  source_url: aibox://runtime-home
  from_version: 0.32.3
  to_version: 0.33.0
  state: applied
  generated_by: aibox apply
  generated_at: 2026-08-17 18:27:59+00:00
  summary: 0 changed upstream, 0 conflicts, 1 new, 0 removed (1 groups affected)
  affected_groups:
  - runtime-misc
  affected_files:
  - path: .local/bin/aibox-agent-signal
    classification: new-upstream
  started_at: '2026-08-18T10:15:36+00:00'
  applied_at: '2026-08-18T10:15:36+00:00'
  progress_notes:
  - timestamp: '2026-08-18T10:15:36+00:00'
    actor: mcp
    note: Reviewed under full project reconciliation. The sole new-upstream runtime
      helper is unambiguous and already supplied by the aibox runtime sync; accepted
      and archived.
---

# Migration MIG-20260817_1827-RuntimeSync-aibox-runtime

Managed `.aibox-home/` runtime changes from `0.32.3` to `0.33.0`.

0 changed upstream, 0 conflicts, 1 new, 0 removed (1 groups affected)

## Counts

- unchanged: 43
- changed-locally-only: 0
- changed-upstream-only: 0
- conflict: 0
- new-upstream: 1
- removed-upstream: 0

- removed-upstream-stale: 0

## Changes by group

### runtime-misc

**new-upstream**

- `.aibox-home/.local/bin/aibox-agent-signal` -> `.aibox-home/.local/bin/aibox-agent-signal`

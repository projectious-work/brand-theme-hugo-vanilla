---
apiVersion: processkit.projectious.work/v2
kind: LogEntry
metadata:
  id: LOG-20260818_1015-FastJay-migration-filename-normalized
  created: '2026-08-18T10:15:35+00:00'
spec:
  event_type: migration.filename-normalized
  timestamp: '2026-08-18T10:15:35+00:00'
  summary: 'Migration ID normalized: ''MIG-LOCK-20260809T181819'' → ''MIG-20260809_1818-LockSnapshot'''
  subject: MIG-20260809_1818-LockSnapshot
  subject_kind: Migration
  actor: processkit-migration-management
  details:
    old_id: MIG-LOCK-20260809T181819
    new_id: MIG-20260809_1818-LockSnapshot
    updated_references:
    - context/migrations/INDEX.md
    preserved_history:
    - context/logs/2026/08/LOG-20260812_1722-MellowSea-migration-transitioned.md
    - context/logs/2026/08/LOG-20260812_1722-SoftSea-migration-applied.md
---

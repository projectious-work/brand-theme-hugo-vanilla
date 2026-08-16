---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260816_1630-SharpCedar-publish-final-theme-changes-as-v0
  created: '2026-08-16T16:30:14+00:00'
spec:
  title: Publish final theme changes as v0.3.1
  state: accepted
  decision: Publish the current final theme implementation as v0.3.1, include all
    existing workspace changes in the integration, and remove merged unused branches
    after release verification.
  context: v0.3.0 was already published before the v8 integration and final alphabetical
    ordering changes.
  rationale: Published tags are immutable; a patch release preserves reproducibility
    while delivering the completed implementation.
  consequences: All current workspace changes become part of the v0.3.1 repository
    state. The release must pass verification, merge to main, publish artifacts and
    Pages, and only then prune merged non-protected branches.
  decided_at: '2026-08-16T16:30:14+00:00'
---

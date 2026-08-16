---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260816_1827-GrandSpruce-publish-asset-hook-fix-as-v0
  created: '2026-08-16T18:27:27+00:00'
spec:
  title: Publish asset hook fix as v0.3.2
  state: accepted
  decision: 'Cut v0.3.2 as a patch release containing the public site-owned CSS and
    JavaScript append hooks delivered for issue #35.'
  context: The fix is merged on main after v0.3.1 and consumers pinned to v0.3.1 cannot
    receive it.
  rationale: A new immutable patch tag is required to distribute the backward-compatible
    API addition.
  consequences: Update release metadata and localized notes, verify, merge, tag, publish
    artifacts, deploy Pages, and verify the live release.
  decided_at: '2026-08-16T18:27:27+00:00'
---

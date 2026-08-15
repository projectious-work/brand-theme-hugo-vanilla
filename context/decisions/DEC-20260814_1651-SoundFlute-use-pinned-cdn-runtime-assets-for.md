---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260814_1651-SoundFlute-use-pinned-cdn-runtime-assets-for
  created: '2026-08-14T16:51:08+00:00'
spec:
  title: Use pinned CDN runtime assets for theme libraries
  state: accepted
  decision: The Hugo theme consumes Mermaid 11.16.1, KaTeX 0.18.4, and asciinema-player
    3.17.0 from CDN URLs pinned to those exact versions. Local vendoring and bundled
    copies of these browser runtimes are removed.
  context: The imported v2 theme pinned older vulnerable versions and described local
    vendoring. The owner explicitly replaced that approach with exact-version CDN
    consumption at upgraded versions.
  rationale: Exact CDN pins remove stale local bundles and Node dependency exposure
    while keeping browser runtime versions deterministic and reviewable.
  alternatives:
  - option: Keep local vendoring and upgrade packages
    reason_rejected: The owner explicitly rejected local bundling.
  - option: Use unversioned CDN URLs
    reason_rejected: Unversioned delivery is not reproducible and can change without
      a repository review.
  consequences: The built site requires CDN availability for math, diagrams, and terminal
    recordings. The release gate must verify exact pins and reject stale or unversioned
    URLs.
  decided_at: '2026-08-14T16:51:08+00:00'
---

---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260825_1442-FaithfulOtter-use-a-generic-typst-graphics-feature
  created: '2026-08-25T14:42:22+00:00'
spec:
  title: Use a generic Typst graphics feature instead of claiming TikZ compatibility
  state: accepted
  decision: Document and support build-integrated Typst graphics through the existing
    generic Typst renderer, with CeTZ and compatible Typst Universe packages as authoring
    libraries. Move this material into a dedicated feature page. Do not claim full
    TikZ compatibility; any future native TikZ support must be a separate backend.
  context: CeTZ is inspired by TikZ but is neither its syntax nor its PGF package
    ecosystem. The existing renderer compiles arbitrary Typst, so package-specific
    backends are unnecessary.
  rationale: This preserves a truthful capability boundary, exposes a broad graphics
    ecosystem with one renderer, and avoids reimplementing TikZ.
  alternatives:
  - option: Extend CeTZ until it is fully TikZ compatible
    reason: Rejected because this would amount to reimplementing TikZ/PGF.
  - option: Add one renderer per Typst Universe package
    reason: Rejected because the generic Typst compiler already executes package imports.
  consequences: Every rendered Typst example documents the complete .typ source and
    the exact Markdown/Hugo invocation. Package imports are pinned. Native TikZ remains
    optional future work with its own dependency and conversion pipeline.
  decided_at: '2026-08-25T14:42:22+00:00'
---

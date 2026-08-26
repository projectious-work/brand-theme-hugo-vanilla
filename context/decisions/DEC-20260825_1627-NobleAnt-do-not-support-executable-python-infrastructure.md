---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260825_1627-NobleAnt-do-not-support-executable-python-infrastructure
  created: '2026-08-25T16:27:56+00:00'
spec:
  title: Do not support executable Python infrastructure diagrams
  state: accepted
  decision: Remove the Mingrammer Diagrams backend and its Infrastructure Diagrams
    documentation. Do not execute unrestricted Python as part of the theme graphics
    pipeline.
  context: The proposed backend required Python, the Diagrams package and Graphviz,
    and its source format was unrestricted executable Python.
  rationale: The dependency footprint and build-time code-execution risk are disproportionate
    for an optional theme feature.
  alternatives:
  - option: Keep local-only reviewed Python sources
    reason: Rejected because even reviewed sources retain the heavy runtime and unrestricted
      execution model.
  - option: Allow remote Python sources
    reason: Rejected as a direct build-time remote-code-execution path.
  consequences: Infrastructure diagrams remain available through safer existing paths
    such as D2, Graphviz/DOT, Mermaid, Typst-generated SVG or finished image assets.
  decided_at: '2026-08-25T16:27:56+00:00'
---

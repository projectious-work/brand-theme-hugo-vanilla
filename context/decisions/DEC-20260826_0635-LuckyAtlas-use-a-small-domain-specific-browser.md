---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260826_0635-LuckyAtlas-use-a-small-domain-specific-browser
  created: '2026-08-26T06:35:06+00:00'
spec:
  title: Use a small domain-specific browser graphics renderer stack
  state: accepted
  decision: Provide first-class renderers for Mermaid, Graphviz, Observable Plot/D3,
    JSXGraph, WaveDrom, lightweight SMILES, pseudocode.js, D2, and Typst/CeTZ. Normalize
    their source resolution and rendering contracts, keep ELK.js internal for layout,
    emit inline SVG or semantic HTML where technically possible, and retain Typst/CeTZ
    as the publication-quality static escape hatch.
  context: The theme needs broad diagram and scientific-graphics coverage with inline
    source, local-file, and approved-URL inputs while retaining inline SVG or semantic
    HTML, selectable text, interaction, deterministic builds, and maintainable dependencies.
  rationale: No single browser library matches TikZ's package breadth. A small domain-specific
    stack gives each domain a mature notation and renderer while a common input/output
    contract keeps Hugo authoring consistent. Inline SVG or semantic HTML preserves
    selection, accessibility, styling, and interaction better than bitmap artifacts.
  alternatives:
  - option: Use only TikZ or Typst/CeTZ for all graphics
    rejected_because: Broad static expressiveness would come at the cost of browser-native
      interaction and heavier compilation for routine diagrams and charts.
  - option: Use only Mermaid and generic D3
    rejected_because: They do not provide adequate mathematical, chemical, waveform,
      algorithm-typesetting, or publication-quality coverage.
  - option: Expose every renderer and layout engine as a separate public feature
    rejected_because: A large public surface would increase documentation, dependency,
      security, and maintenance costs; ELK.js is more useful as an internal layout
      engine.
  consequences: The theme gains consistent inline/file/approved-URL authoring and
    richer domain coverage. Optional build and browser dependencies must be documented
    and pinned. Renderer-specific security policies, SVG sanitization/namespacing,
    caching, accessibility fallbacks, and browser tests become part of the implementation.
    D2 remains first-class and receives provider-style infrastructure examples.
  decided_at: '2026-08-26T06:35:06+00:00'
---

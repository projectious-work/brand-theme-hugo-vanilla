---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260817_0820-TrustyButter-examples-use-a-dedicated-theme-native
  created: '2026-08-17T08:20:58+00:00'
  updated: '2026-08-17T08:35:56+00:00'
spec:
  title: Examples use a dedicated theme-native showcase layout
  state: accepted
  decision: Add Examples as a documentation navigation section with a card overview,
    while rendering each example detail page in a dedicated full-width showcase layout
    built from the theme's semantic tokens and Hugo templates.
  context: The user requested eight visual example pages linked from Documentation
    but explicitly not embedded in the Documentation-type layout.
  rationale: A dedicated layout demonstrates real site composition without sidebars
    or documentation furniture, while keeping example source content and navigation
    idiomatic and maintainable.
  alternatives:
  - option: Render examples inside the documentation shell
    reason: Rejected because it would not demonstrate non-documentation page composition.
  - option: Copy supplied mockup implementations
    reason: Rejected because the mockups are visual references only and would bypass
      theme idioms.
  consequences: The theme gains an example layout, reusable showcase partials/styles,
    multilingual overview/navigation content, and visual/browser coverage.
  decided_at: '2026-08-17T08:20:58+00:00'
  related_workitems:
  - BACK-20260817_0835-BuoyantPrairie-theme-native-page-examples
---

---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260825_1252-CordialBeam-progressively-enhanced-typed-data-tables
  created: '2026-08-25T12:52:05+00:00'
spec:
  title: Progressively enhanced typed data tables
  state: accepted
  decision: Keep the compact key:Label column syntax for basic tables and add structured
    column metadata for advanced tables. Render the complete accessible table and
    typed display values at Hugo build time; opt-in JavaScript progressively adds
    search, sorting, and filtering without becoming required for access to the data.
  context: The data-table component needs optional search, sorting, filtering, alignment,
    and formatting for strings, integers, floats, booleans, dates, URLs, and statuses.
  rationale: This preserves the existing simple API and no-JavaScript accessibility
    while enabling deterministic typed behavior and richer tables. Type-specific formatting
    is clearer and safer than applying unrestricted printf strings to every value.
  alternatives:
  - option: Replace the compact API with structured definitions only
    reason_rejected: Unnecessarily breaks simple existing tables.
  - option: Render and format everything in client-side JavaScript
    reason_rejected: Makes core table content depend on JavaScript and weakens deterministic
      builds.
  - option: Use unrestricted printf formatting for every type
    reason_rejected: Dates, booleans, links, and statuses need semantic type-specific
      handling and validation.
  consequences: Advanced shortcode use requires a columns data file. Interactive controls
    and the table enhancer load only when requested. Sort and filter operations use
    raw typed values while cells retain build-time formatted output.
  decided_at: '2026-08-25T12:52:05+00:00'
---

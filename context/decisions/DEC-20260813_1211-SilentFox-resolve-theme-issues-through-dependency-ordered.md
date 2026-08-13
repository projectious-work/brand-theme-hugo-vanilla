---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260813_1211-SilentFox-resolve-theme-issues-through-dependency-ordered
  created: '2026-08-13T12:11:30+00:00'
spec:
  title: Resolve theme issues through dependency-ordered parallel workstreams
  state: accepted
  decision: 'Resolve GitHub issues #1–#8 through three coordinated workstreams: identity
    and release governance; Hugo contract, AI documentation, and product MCP; brand
    provenance, fonts, verification, and Pages hardening. Establish shared identity,
    provenance, and contract foundations before generated outputs and release hardening.
    Use short-lived branches, local verification, and no GitHub Actions.'
  context: The user accepted the implementation plan after review of all eight open
    issues.
  rationale: The grouping minimizes overlap while honoring dependencies among module
    identity, canonical product facts, generated documentation, provenance, and release
    evidence.
  alternatives:
  - option: Resolve issues strictly in numeric order
    reason_rejected: Would serialize independent work and cause rework across shared
      contracts.
  - option: Implement each issue independently
    reason_rejected: Would duplicate identity, documentation, provenance, and verification
      sources.
  consequences: Implementation proceeds in phases with up to three cost-efficient
    fast-model read-only agents; repository mutations remain with the primary agent.
    Integration and deployment occur only after acceptance criteria are verified.
  decided_at: '2026-08-13T12:11:30+00:00'
---

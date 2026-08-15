---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260814_1413-StrongRobin-keep-release-automation-local-and-script
  created: '2026-08-14T14:13:38+00:00'
spec:
  title: Keep release automation local and script-driven
  state: accepted
  decision: This repository must not use GitHub Actions or workflow files. All release
    validation, Playwright visual regression testing, packaging, tagging, publishing,
    and deployment are performed manually from local scripts.
  context: The release pipeline needs a company-standard implementation for the v0.3
    Hugo theme. The owner explicitly prohibited GitHub Actions and required manual
    local release work, while also requiring Playwright visual testing.
  rationale: Local scripts keep the release path provider-neutral, auditable from
    the developer environment, and aligned with the owner’s explicit operating standard.
  consequences: Release scripts become the sole automation surface. Documentation
    must describe prerequisites and operator steps. The release command must fail
    closed unless build, deterministic verification, and Playwright visual regression
    gates pass.
  decided_at: '2026-08-14T14:13:38+00:00'
---

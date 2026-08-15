---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260815_1927-DaringBison-guide-navigation-template-authoring
  created: '2026-08-15T19:27:21+00:00'
  updated: '2026-08-15T19:39:13+00:00'
spec:
  title: Correct guide navigation and add template authoring guide
  state: done
  type: story
  priority: medium
  description: Restore Guides as the documentation section label, label its overview
    entry Content authoring guide, and add a practical step-by-step Template authoring
    guide including Hugo overrides, Tailwind, tokens, icons, validation, and maintenance.
  started_at: '2026-08-15T19:37:01+00:00'
  completed_at: '2026-08-15T19:39:13+00:00'
---

## Transition note (2026-08-15T19:37:01+00:00)

Implemented documentation navigation, template-authoring and code-block guidance, and explicit English default; verification is passing.


## Transition note (2026-08-15T19:37:25+00:00)

Implementation committed as a72f7ef; deterministic build and full browser verification passed with artifact 54a158132046581d112677fdd1b2d39a54a48822fd181e37fe43a14e7e5dcb59.


## Transition note (2026-08-15T19:39:13+00:00)

Merged in PR #29 after full verification; English is the default unprefixed language and the documentation updates are live in main.

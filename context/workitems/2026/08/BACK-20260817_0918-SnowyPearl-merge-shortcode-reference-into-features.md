---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260817_0918-SnowyPearl-merge-shortcode-reference-into-features
  created: '2026-08-17T09:18:23+00:00'
  updated: '2026-08-17T09:39:38+00:00'
spec:
  title: Merge shortcode reference into Features
  state: review
  type: story
  priority: medium
  description: Make Features the authoritative capability documentation, migrate shortcode
    examples into feature pages, add missing feature pages, remove standalone Shortcodes,
    and update links and tests.
  started_at: '2026-08-17T09:18:29+00:00'
---

## Transition note (2026-08-17T09:18:29+00:00)

Inventorying shortcode coverage and consolidating into Features.


## Transition note (2026-08-17T09:39:38+00:00)

Merged shortcode reference into localized Features pages, replaced Blog with a localized chronological Change log, preserved compatibility aliases, and passed ./scripts/verify.sh (27 passed, 11 intentionally skipped).

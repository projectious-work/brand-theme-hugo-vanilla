---
apiVersion: processkit.projectious.work/v2
kind: WorkItem
metadata:
  id: BACK-20260817_0918-SnowyPearl-merge-shortcode-reference-into-features
  created: '2026-08-17T09:18:23+00:00'
  updated: '2026-08-17T09:51:54+00:00'
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


## Transition note (2026-08-17T09:43:42+00:00)

Deployment inspection found localized aliases were double-prefixed by Hugo; correcting aliases and adding regression checks.


## Transition note (2026-08-17T09:44:47+00:00)

Corrected language-relative aliases, added checks for all six legacy redirects and absence of doubled language directories, and reran ./scripts/verify.sh successfully.


## Transition note (2026-08-17T09:50:09+00:00)

Live semantic validation found residual BlogPosting JSON-LD; replacing it with CollectionPage for the Change log index and Article for release notes.


## Transition note (2026-08-17T09:51:54+00:00)

Removed residual BlogPosting semantics, added schema regression checks, and passed ./scripts/verify.sh.

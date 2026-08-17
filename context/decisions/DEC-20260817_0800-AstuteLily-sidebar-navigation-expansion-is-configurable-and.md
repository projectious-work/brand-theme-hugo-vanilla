---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260817_0800-AstuteLily-sidebar-navigation-expansion-is-configurable-and
  created: '2026-08-17T08:00:36+00:00'
spec:
  title: Sidebar navigation expansion is configurable and persistent
  state: accepted
  decision: Documentation sidebar groups are collapsed by default, the initial state
    is configurable, readers can expand or collapse all groups, and individual open
    states persist across page navigation.
  context: The existing theme opens all documentation sidebar groups on every page
    load, creating visual noise and losing reader context after navigation.
  rationale: A collapsed default reduces scanning load, configuration preserves site-owner
    control, and local persistence respects each reader's navigation workflow.
  alternatives:
  - option: Keep all groups open
    reason: Rejected as the new default because it overwhelms larger documentation
      trees.
  - option: Always open only the active branch
    reason: Not sufficient because it discards reader-controlled exploration state.
  consequences: The sidebar needs stable group identifiers, accessible controls, a
    documented theme parameter, localized labels, and browser tests for persistence.
  decided_at: '2026-08-17T08:00:36+00:00'
---

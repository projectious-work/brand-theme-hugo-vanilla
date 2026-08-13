---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260813_1359-SnappyMaple-protect-main-while-retaining-maintainer-pr
  created: '2026-08-13T13:59:10+00:00'
spec:
  title: Protect main while retaining maintainer PR merges
  state: accepted
  decision: 'Protect main for administrators and contributors: require pull requests,
    linear history, and resolved conversations; disallow force pushes and deletion;
    require zero approvals and no status checks until local verification is represented
    by a reliable hosted check.'
  context: GitHub reported that main was unprotected. The owner asked for protection
    that still permits the assistant to merge pull requests on their behalf.
  rationale: This prevents destructive direct updates while preserving the human-controlled,
    no-GitHub-Actions workflow and allowing maintainers to merge the current PR stack.
  alternatives:
  - option: Require one approval
    reason_rejected: Would prevent a sole maintainer from merging the current stack
      on the owner's behalf.
  - option: Leave administrators exempt
    reason_rejected: Would not protect main consistently against accidental force
      pushes or deletion.
  consequences: All main changes, including administrator changes, must use pull requests.
    Maintainers can merge without an independent approval after resolving conversations.
    Status checks can be added later when a reliable check provider exists.
  decided_at: '2026-08-13T13:59:10+00:00'
---

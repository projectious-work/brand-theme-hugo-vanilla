---
apiVersion: processkit.projectious.work/v2
kind: DecisionRecord
metadata:
  id: DEC-20260813_1735-FirmHawk-cut-v0-2-4-before-deploying
  created: '2026-08-13T17:35:18+00:00'
spec:
  title: Cut v0.2.4 before deploying rather than overriding the deploy guard
  state: accepted
  decision: Cut a v0.2.4 patch release (version bump, CHANGELOG, tag) via a release
    branch and PR, then deploy to GitHub Pages from the tagged main, instead of running
    scripts/deploy.sh with --allow-untagged.
  context: 'PR #17 (visual brand-compliance fixes found via Playwright review) was
    squash-merged to main as 9aeb354. main is protected and requires PRs. scripts/deploy.sh
    guards deployment on two conditions: HEAD must be on main, and HEAD must carry
    an exact SemVer tag. Merged main satisfies the first but not the second, so the
    deploy was blocked. origin/main previously sat at v0.2.3. Decision taken by the
    repository owner.'
  rationale: The tag guard exists so that the live Pages site always corresponds to
    a released, traceable version. Overriding it would publish untagged code and let
    gh-pages diverge from the release train, which is precisely the failure mode the
    guard was added to prevent. Cutting a patch release is the repo's documented path
    (v0.2.1 through v0.2.3 all followed release branch -> PR -> tag -> deploy) and
    costs one extra PR.
  alternatives:
  - option: Deploy immediately with --allow-untagged
    why_rejected: Uses a flag the script itself labels an emergency override; the
      live site would not correspond to any tagged release and gh-pages would diverge
      from the release train.
  - option: Do not deploy yet; bundle into the next scheduled release
    why_rejected: Leaves user-visible rendering defects (escaped terminal markup,
      broken dashboard table, clipped mobile cards) live on the published site for
      longer than necessary.
  consequences: One additional release PR is required before the site can be updated.
    The live site stays traceable to a SemVer tag. The accent-tag mitigation ships
    in v0.2.4 and can be reverted once projectious-work/brand#15 lands upstream and
    tokens.css is re-synced.
  decided_at: '2026-08-13T17:35:18+00:00'
---

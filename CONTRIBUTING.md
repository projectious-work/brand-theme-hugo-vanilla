# Contributing and releases

## Branches and pull requests

`main` is the only long-lived source branch and always represents the stable
integration state. Use short-lived `feat/<topic>`, `fix/<topic>`, or
`docs/<topic>` branches and merge reviewed pull requests by squash merge.
Commits use Conventional Commits.

`gh-pages` contains generated deployment output only. Never implement or edit
source code on that branch. A promotion branch is introduced only for an
explicitly approved parallel major rewrite.

This project uses the company simple branching profile. There is no host gate,
long-lived development branch, or GitHub Actions workflow. Verification,
release, and publication are deliberate local operations.

## Versioning

The theme follows Semantic Versioning:

- Patch releases contain compatible fixes and documentation corrections.
- Minor releases add backwards-compatible features or deprecations.
- Major releases remove or incompatibly change the public theme contract.

Before version 1.0, consumer-facing migrations are still called out prominently
in the changelog and release notes. The module rename to
`github.com/projectious-work/brand-theme-hugo-vanilla` requires consumers to
update both `go.mod` and `hugo.toml` imports.

## Release procedure

Releases are performed from a clean, current `main` checkout:

1. Run the complete local verification command.
2. Update `CHANGELOG.md` and all version metadata.
3. Commit the release preparation through a reviewed pull request.
4. Create an annotated `vX.Y.Z` tag on the merged commit.
5. Push `main` and the tag.
6. Create the GitHub release from that immutable tag and its release notes.
7. Run `scripts/deploy.sh` to publish generated output to `gh-pages`.
8. Verify the public Pages URL and record its deployed source tag and hashes.

The version bump, changelog, tag, GitHub release, and Pages publication are one
release procedure. If Pages publication fails after the GitHub release exists,
retry publication from the same tagged commit; do not create or move a tag.

Release verification currently starts with:

```sh
scripts/check-identity.sh
scripts/build.sh /tmp/brand-theme-hugo-vanilla-build
git diff --check
```

The unified release-grade verification command will supersede this provisional
sequence as part of deployment hardening.

## Hotfixes and rollback

Create a hotfix branch from the latest release tag, apply and verify the narrow
fix, then merge it back to `main`. Publish a new patch tag, GitHub release, and
Pages deployment using the normal sequence.

Rollback means redeploying a known-good immutable tag. Do not rewrite `main`,
move a published tag, or implement directly on `gh-pages`.

The repository currently has no stale remote source branches. Branch deletion
is owner-approved cleanup after the corresponding pull request is merged.

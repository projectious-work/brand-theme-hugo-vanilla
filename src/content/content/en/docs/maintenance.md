+++
title = "Maintenance and upgrades"
description = "Keep the theme, runtime pins, content and published documentation current."
weight = 70
icon = "versions"
+++

Treat theme upgrades as reviewed application changes. They can affect templates,
generated URLs, accessibility, search records and screenshots even when content is
unchanged.

## Upgrade a consuming site

1. Read the release notes and compare configuration examples.
2. Update the pinned Hugo Module version:

   ```sh
   hugo mod get github.com/projectious-work/brand-theme-hugo-vanilla@vX.Y.Z
   hugo mod tidy
   ```

3. Update locked Node dependencies with `npm install` when the release changes
   `package.json`.
4. Compare local template overrides with their new upstream versions.
5. Build with the production `baseURL`, run link and browser checks, and review
   visual changes in every supported language.
6. Commit `go.mod`, `go.sum`, package lockfiles and required configuration changes
   together.

## Routine checks

- Run `npm audit` and review direct dependency updates.
- Test the minimum and current supported Hugo versions.
- Check external links and the Edit-this-page prefix.
- Verify search, version and language menus after adding or moving pages.
- Review translated pages whenever English structure changes.
- Confirm CDN pins still exist and self-hosted mirrors match them.
- Re-run accessibility checks after CSS, navigation or component changes.

## Maintain versioned documentation

Publish a version URL before adding it to `params.versions`. Keep canonical current
documentation at the stable root. When removing an old version, remove its selector
entry and configure redirects where links may remain in the wild.

## Repository release chain

This repository uses local scripts rather than GitHub workflows. From a clean,
synchronized `main` after review:

```sh
./scripts/release.sh vX.Y.Z
```

The script verifies deterministic output and browser baselines, packages the theme,
creates the annotated tag and GitHub release, then deploys that tagged commit to
GitHub Pages. Never deploy an unreviewed working tree.

## Recovery and support

Published tags and GitHub release archives are immutable recovery points. Report
security issues through `SECURITY.md`; use GitHub issues for reproducible defects
and discussions for usage questions when enabled.

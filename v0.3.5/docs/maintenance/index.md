# Maintenance and upgrades

> Keep the theme, runtime pins, content and published documentation current.


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

## Check for a new release

Copy `scripts/check-theme-update.sh` from the theme release into the consuming
site's `scripts/` directory and make it executable. It reads the installed version
from Hugo's module graph and compares it with upstream SemVer tags:

```sh
chmod +x scripts/check-theme-update.sh
./scripts/check-theme-update.sh
```

It is check-only by default and exits with status 10 when an update is available,
which makes it suitable for a scheduled local task. After reading the release
notes and committing or stashing site changes, apply the update explicitly:

```sh
./scripts/check-theme-update.sh --update
```

The update mode runs `hugo mod get` and `hugo mod tidy`; it deliberately does not
rewrite configuration, overwrite local templates or publish. Review the resulting
`go.mod`/`go.sum`, compare configuration examples, then run the consuming site's
build, link, accessibility and visual tests.

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


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.5/docs/maintenance/index.md

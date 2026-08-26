# Versioned documentation

> Publish separate documentation builds and connect them with the version menu.


Each documentation version is a separate Hugo build. Publish the newest release at
the stable site root and older builds below prefixes such as `/v0.2/`. Never add a
version-menu entry until that URL exists.

## Add an archived version step by step

1. Check out the source tag for the older documentation, for example `v0.2.0`.
2. Build that checkout with a base URL ending in `/v0.2/`:

   ```sh
   hugo --baseURL https://docs.example.com/v0.2/ --destination public/v0.2
   ```

3. Publish the entire generated `public/v0.2/` tree. It contains that release's
   `index.html`, section/page directories, CSS, JavaScript, fonts, search index and
   other static assets—not Markdown source files copied by hand.
4. Verify `https://docs.example.com/v0.2/` and representative child pages.
5. Return to the current source and add the selector entry shown below.
6. Deploy current documentation without deleting the already-published `v0.2/`
   directory.

```toml
[params]
  version = "v0.3"
  versionMenuLabel = "Releases" # Optional independent control label.

  [[params.versions]]
    label = "v0.3"
    url = "/"
    note = "latest"

  [[params.versions]]
    label = "v0.2"
    url = "v0.2/"
```

`versionMenuLabel` changes only the trigger and menu heading. The footer and
selected entry continue to use `version`.

The menu normally appends the current page path so readers stay on the same topic.
Set `params.versionProbe = false`, or `probe = false` on one entry, when versions
have different structures. Older builds display a banner linking to the first
configured version.

This repository lists archived tags in `scripts/docs-archives.txt` and the complete
cross-version navigation catalog in `scripts/docs-versions.toml`. The deployment
script rebuilds every listed immutable tag below its matching prefix and injects
the current catalog before it publishes the current root. A clean checkout thus
reproduces the complete version menu in every archived site without relying on
state left by an earlier deployment. Consumers can use the same pattern or retain
their archived generated trees by another deployment method.


---
Source: https://projectious-work.github.io/brand-theme-hugo-vanilla/v0.3.6/docs/features/versioning/index.md

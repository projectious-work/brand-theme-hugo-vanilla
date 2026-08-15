+++
title = "Versioned documentation"
description = "Publish separate documentation builds and connect them with the version menu."
weight = 30
icon = "versions"
+++

Each documentation version is a separate Hugo build. Publish the newest release at
the stable site root and older builds below prefixes such as `/v0.2/`. Never add a
version-menu entry until that URL exists.

```toml
[params]
  version = "v0.3"

  [[params.versions]]
    label = "v0.3"
    url = "/"
    note = "latest"

  [[params.versions]]
    label = "v0.2"
    url = "v0.2/"
```

The menu normally appends the current page path so readers stay on the same topic.
Set `params.versionProbe = false`, or `probe = false` on one entry, when versions
have different structures. Older builds display a banner linking to the first
configured version.

The repository's release script deploys the current release only. If you retain
multiple published trees, your deployment process must preserve older prefixes.

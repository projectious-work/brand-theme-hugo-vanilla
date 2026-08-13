---
title: "Brand provenance and fonts"
url: "https://projectious-work.github.io/brand-theme-hugo-vanilla/docs/brand-and-fonts/"
description: "Trace theme tokens, marks, and fonts to pinned upstream sources."
---


## Design authority

The authoritative design source is
[`projectious-work/brand`](https://github.com/projectious-work/brand). This
theme currently targets brand release `v2.1.1` at commit
`fc8a5b5c9a063fae583b086e22a2642dd95ba284`.

`src/data/brand-provenance.json` records the source path, immutable source
revision, licence, transformation, and SHA-256 hash of every derived token,
logo, font, and font licence. Run these commands after changing brand inputs:

```sh
scripts/sync-brand-assets.py --write
scripts/check-brand-provenance.py
```

Updating the pinned brand release requires visual, accessibility, and Hugo
compatibility review. The checker rejects altered and unlisted brand artifacts;
intentional deviations belong in `semanticOverrides` with their rationale.

## Bundled fonts

The default `bundled` profile serves version-pinned Latin WOFF2 faces for Plus
Jakarta Sans, Source Sans 3, and IBM Plex Mono from the generated site itself.
It makes no request to Google Fonts or another font CDN. Each family ships with
its SIL Open Font License 1.1 text.

Use platform fonts without downloading the bundled faces:

```toml {filename="hugo.toml"}
[params]
  fonts = "system"
```

Both profiles use `--font-heading`, `--font-body`, and `--font-code`. Override
those semantic tokens in a site stylesheet to substitute another family
without changing components.


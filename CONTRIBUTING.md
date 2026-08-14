# Contributing

`main` remains the stable v0.2.x line. The `release/v0.3.0` branch contains
the imported v0.3 theme and its example site.

Install and verify the toolchain before submitting a change:

```sh
npm install
./scripts/verify.sh
```

When contributing:

- make v0.3.0 work on short-lived branches based on `release/v0.3.0`;
- merge reviewed changes back into `release/v0.3.0`;
- use Conventional Commits;
- do not edit the generated `gh-pages` branch directly;
- keep build and deployment tooling outside `src/`; and
- treat the imported theme in `src/` as unchanged upstream source unless a
  future task explicitly authorizes theme changes.

The immutable `v0.2.x` tags remain the reference for the previous theme.

# Contributing

`main` remains the stable v0.2.x line. The `release/v0.3.0` branch contains
the imported v0.3 theme and its example site.

Install and verify the toolchain before submitting a change:

```sh
npm install
./scripts/serve-watch.sh start
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

## Local release chain

This repository deliberately has no GitHub Actions or workflow files. After a
release branch has passed review and its pull request is merged, update the
version and dated changelog on that branch. From a clean, synchronized `main`,
run:

```sh
./scripts/release.sh vX.Y.Z
```

The command fails closed unless deterministic builds and Playwright visual
regressions pass. It then packages the theme, creates and pushes an annotated
tag, creates and verifies the GitHub Release, and deploys that exact tagged
commit to `gh-pages`. Do not use `scripts/deploy.sh --allow-untagged` in the
normal release chain.

The managed watch server remains available at
`http://localhost:1312/brand-theme-hugo-vanilla/`. Use
`./scripts/serve-watch.sh status` or `./scripts/serve-watch.sh stop` to inspect
or stop it.

The immutable `v0.2.x` tags remain the reference for the previous theme.

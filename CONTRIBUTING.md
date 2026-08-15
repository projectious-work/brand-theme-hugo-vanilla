# Contributing

Thank you for improving the projectious.work Hugo theme. Contributions should be
small enough to review, documented for users, and verified locally.

## Before opening a change

- Search existing issues and pull requests.
- Open an issue for substantial behavior, API or design changes before investing
  in implementation.
- Do not disclose security vulnerabilities publicly; follow `SECURITY.md`.
- Agree to follow `CODE_OF_CONDUCT.md` in every project space.

## Development setup

```sh
npm install
./scripts/serve-watch.sh start
./scripts/verify.sh
```

The example site is available at
`http://localhost:1312/brand-theme-hugo-vanilla/`. Theme source lives under
`src/`; release and deployment tooling stays outside that directory.

## Branch and pull-request workflow

1. Synchronize `main` and create a short-lived branch.
2. Make focused changes using Conventional Commits.
3. Add or update tests and documentation in the same branch.
4. Run `./scripts/verify.sh` and relevant security checks.
5. Open a pull request linked to its WorkItem or issue.
6. Address review feedback and squash-merge after approval.

`main` is protected. Do not push directly, bypass hooks, use `--no-verify`, or edit
the generated `gh-pages` branch. Existing user changes in a working tree must be
preserved.

## Visual changes

Playwright failures produce actual, expected and diff images under `.deploy/`.
Inspect them before running:

```sh
npx playwright test --update-snapshots
```

Commit a new baseline only when the visual change is intentional and reviewed at
desktop and mobile widths.

## Documentation and translations

Use plain, professional English and define unfamiliar terms. Keep English, German
and French page topology aligned. New reader-facing behavior needs configuration,
authoring and maintenance guidance where applicable.

Hard-wrap prose at 80 columns, except tables, URLs and code blocks.

## Local release chain

This repository intentionally has no GitHub Actions or workflow files. After the
release pull request is merged, run from a clean, synchronized `main`:

```sh
./scripts/release.sh vX.Y.Z
```

The script verifies deterministic output and browser baselines, packages the theme,
creates and pushes an annotated tag, publishes the GitHub release and deploys that
tagged commit to GitHub Pages. `--allow-untagged` is not part of the normal release
process.

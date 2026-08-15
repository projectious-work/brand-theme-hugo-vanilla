# Security policy

## Supported versions

Security fixes are applied to the latest published minor release. Older tags remain
available as immutable archives but do not receive routine fixes.

## Reporting a vulnerability

Do not open a public issue. Use GitHub's private vulnerability-reporting feature
for this repository. If that feature is unavailable, contact the maintainers
through the private channel listed on the projectious.work organization profile.

Include the affected version, reproduction steps, impact, required configuration
and any proposed mitigation. Do not include secrets or personal data.

Maintainers will acknowledge a complete report within five business days, assess
severity and scope, and coordinate disclosure after a fix is available. Timelines
may vary with complexity, but reporters will receive progress updates.

## Security boundaries

The theme produces a public static site. `private = true`, robots directives and
search-index exclusions are publication controls, not authentication. Never commit
secrets or restricted content.

The optional feedback endpoint is external to the theme and must implement the
controls in `CONTRACT-feedback.md`. CDN dependencies are pinned to exact versions;
deployments requiring full local control should enable self-hosting and mirror the
documented files.

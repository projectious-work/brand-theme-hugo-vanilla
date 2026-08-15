#!/usr/bin/env bash
set -euo pipefail

MODULE="github.com/projectious-work/brand-theme-hugo-vanilla"
UPDATE=false
[[ "${1:-}" == "--update" ]] && UPDATE=true

command -v hugo >/dev/null || {
  echo "error: Hugo is required" >&2
  exit 2
}
command -v git >/dev/null || {
  echo "error: Git is required" >&2
  exit 2
}
[[ -f go.mod ]] || {
  echo "error: run this from the root of a Hugo Module site" >&2
  exit 2
}

current="$(hugo mod graph | awk -v module="$MODULE" '$2 ~ ("^" module "@") { sub("^" module "@", "", $2); print $2; exit }')"
[[ -n "$current" ]] || {
  echo "error: $MODULE is not present in the Hugo module graph" >&2
  exit 2
}

latest="$(git ls-remote --tags --refs "https://$MODULE.git" 'v*' \
  | sed 's#.*refs/tags/##' \
  | sort -V \
  | tail -1)"
[[ -n "$latest" ]] || {
  echo "error: no upstream release tags were returned" >&2
  exit 2
}

printf 'installed: %s\nlatest:    %s\n' "$current" "$latest"
if [[ "$current" == "$latest" ]]; then
  echo "Theme is current."
  exit 0
fi

if ! $UPDATE; then
  echo "Update available. Review the release notes, then rerun with --update."
  exit 10
fi

echo "Updating the Hugo Module and tidying go.mod/go.sum..."
hugo mod get "$MODULE@$latest"
hugo mod tidy
echo "Updated to $latest. Review configuration changes and run the site's tests."

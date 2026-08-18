---
apiVersion: processkit.projectious.work/v1
kind: Migration
metadata:
  id: MIG-20260809_1818-LockSnapshot
  created: 2026-08-09 18:18:19+00:00
  updated: '2026-08-12T17:22:43+00:00'
spec:
  source: aibox-lock
  source_url: aibox://lock
  kind: schema-extension
  state: applied
  generated_by: aibox apply
  generated_at: 2026-08-09 18:18:19+00:00
  summary: 'Backfilled previous_selection: 10 addon(s), 30 tool(s), 2 harness(es)'
  started_at: '2026-08-12T17:22:43+00:00'
  applied_at: '2026-08-12T17:22:43+00:00'
  progress_notes:
  - timestamp: '2026-08-12T17:22:43+00:00'
    actor: mcp
    note: Applied during user-requested full reconciliation; lockfile baseline was
      already backfilled and migration requires no additional code changes.
---

# Migration MIG-20260809_1818-LockSnapshot

`aibox.lock` schema extended in v0.25.6 to record the previously
applied addon-tool and harness selection (DEC-20260508_1515-SilentAsh,
BR-CLEANUP-ARCH item 1). This backfill captures the current selection
as the baseline so the next `aibox apply` can compute a removal diff
when a tool or harness is disabled.

Backfilled previous_selection: 10 addon(s), 30 tool(s), 2 harness(es)

## Backfilled addon selection

- `docs-hugo`: hugo
- `git-ui`: gh, lazygit
- `go`: go
- `go-quality`: goimports, golangci-lint, gosec, govulncheck, staticcheck
- `go-release`: goreleaser
- `node`: node, pnpm
- `preview-archive`: chafa, entr, librsvg, mupdf, p7zip, poppler, resvg, timg
- `preview-enhanced`: ffmpeg, ghostscript, rich
- `release`: hadolint, shellcheck
- `supply-chain`: cosign, gitleaks, grype, osv-scanner, syft

## Backfilled harness selection

- claude, codex

## Next action

Acknowledge with the migration-management skill (`/pk-resume` will
surface it). No code change is required — the next `aibox apply`
will use this baseline automatically.

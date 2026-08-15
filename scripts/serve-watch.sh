#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="$ROOT_DIR/.deploy/serve"
LOG_FILE="$STATE_DIR/hugo-1312.log"
ACTION="${1:-start}"
TMUX_SOCKET="brand-theme"
TMUX_SESSION="brand-theme-hugo-1312"

is_running() {
  tmux -L "$TMUX_SOCKET" has-session -t "$TMUX_SESSION" 2>/dev/null
}

case "$ACTION" in
  start)
    if is_running; then
      echo "Hugo watch server is already running"
      exit 0
    fi
    mkdir -p "$STATE_DIR"
    command -v tmux >/dev/null 2>&1 || {
      echo "error: tmux is required for the persistent watch service" >&2
      exit 1
    }
    tmux -L "$TMUX_SOCKET" new-session -d -s "$TMUX_SESSION" \
      "$ROOT_DIR/scripts/serve.sh 2>&1 | tee '$LOG_FILE'"
    for _ in {1..50}; do
      if curl -fsS \
        http://127.0.0.1:1312/brand-theme-hugo-vanilla/ >/dev/null; then
        echo "Hugo watch server started"
        echo "URL: http://localhost:1312/brand-theme-hugo-vanilla/"
        exit 0
      fi
      is_running || break
      sleep 0.1
    done
    echo "error: Hugo watch server failed; see $LOG_FILE" >&2
    exit 1
    ;;
  status)
    if is_running; then
      echo "running"
    else
      echo "stopped"
      exit 1
    fi
    ;;
  stop)
    if is_running; then
      tmux -L "$TMUX_SOCKET" kill-session -t "$TMUX_SESSION"
      echo "Hugo watch server stopped"
    else
      echo "Hugo watch server is not running"
    fi
    ;;
  *)
    echo "usage: scripts/serve-watch.sh [start|status|stop]" >&2
    exit 2
    ;;
esac

#!/bin/bash
# SessionStart hook for Claude Code on the web.
# Installs Python dependencies so the jobbot package is importable and the
# `python -m jobbot ...` commands work right after the session starts.
set -euo pipefail

# Only run in the remote (web) environment; locally you manage your own venv.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

echo "[session-start] Installing Python dependencies..."
python3 -m pip install --quiet -r requirements.txt

# Make `python -m jobbot` resolve from the repo root for every command run
# in this session.
echo 'export PYTHONPATH="${CLAUDE_PROJECT_DIR:-.}:${PYTHONPATH:-}"' >> "$CLAUDE_ENV_FILE"

echo "[session-start] Done."

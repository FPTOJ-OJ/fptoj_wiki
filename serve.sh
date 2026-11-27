#!/usr/bin/env bash
# Zensical dev server. Usage: ./serve.sh [port]
# Sua file trong docs/ -> watcher tu sync sang build/docs -> Zensical rebuild.
set -euo pipefail

PORT="${1:-8000}"
LOGFILE="log.txt"
PYTHON=$(command -v python3 || command -v python)

if ! $PYTHON -c "import zensical" &>/dev/null; then
    echo "[INFO] Installing dependencies..."
    $PYTHON -m pip install -r requirements.txt
fi

echo "[1/2] Preparing content..."
$PYTHON scripts/prepare_zensical.py

echo "[2/2] Serving on http://localhost:${PORT} (Ctrl+C to stop)"
$PYTHON scripts/prepare_zensical.py --watch &
WATCH_PID=$!
trap 'kill "$WATCH_PID" 2>/dev/null || true' EXIT INT TERM

export PYTHONUNBUFFERED=1
zensical serve -f zensical.generated.yml -a "localhost:${PORT}" 2>&1 | tee "$LOGFILE"

#!/usr/bin/env bash
# Zensical dev server for Linux/macOS (production builds with Zensical too)
# Usage: ./serve.sh [port]
#   port: optional, default 8000
#
# Sửa file trong docs/ → watcher tự chuẩn bị lại nội dung (matplotlib/mermaid)
# → Zensical rebuild trang bị ảnh hưởng.

set -euo pipefail

PORT="${1:-8000}"
LOGFILE="log.txt"

if ! command -v python3 &>/dev/null && ! command -v python &>/dev/null; then
    echo "[ERROR] Python not found. Install Python 3.8+ first."
    exit 1
fi

PYTHON=$(command -v python3 || command -v python)

if ! $PYTHON -c "import zensical" &>/dev/null; then
    echo "[INFO] Installing dependencies..."
    $PYTHON -m pip install -r requirements.txt
fi

echo "======================================================"
echo "  Preparing content (matplotlib + mermaid)..."
echo "======================================================"
$PYTHON scripts/prepare_zensical.py

echo "======================================================"
echo "  Zensical server on http://localhost:${PORT}"
echo "  Logs: ${LOGFILE}"
echo "  Press Ctrl+C to stop"
echo "======================================================"
echo ""

$PYTHON scripts/prepare_zensical.py --watch &
WATCH_PID=$!
trap 'kill "$WATCH_PID" 2>/dev/null || true' EXIT INT TERM

export PYTHONUNBUFFERED=1
zensical serve -f zensical.generated.yml -a "localhost:${PORT}" 2>&1 | tee "$LOGFILE"

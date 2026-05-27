#!/usr/bin/env bash
# MkDocs dev server launcher for Linux/macOS
# Usage: ./serve.sh [port]
#   port: optional, default 8000

set -euo pipefail

PORT="${1:-8000}"
LOGFILE="log.txt"

# Check Python
if ! command -v python3 &>/dev/null && ! command -v python &>/dev/null; then
    echo "[ERROR] Python not found. Install Python 3.8+ first."
    exit 1
fi

PYTHON=$(command -v python3 || command -v python)

# Check deps
if ! $PYTHON -m mkdocs --version &>/dev/null; then
    echo "[INFO] Installing dependencies..."
    $PYTHON -m pip install -r requirements.txt
fi

echo "======================================================"
echo "  MkDocs Server starting on http://localhost:${PORT}"
echo "  Logs: ${LOGFILE}"
echo "  Press Ctrl+C to stop"
echo "======================================================"
echo ""

export PYTHONUNBUFFERED=1

$PYTHON -m mkdocs serve -a "localhost:${PORT}" 2>&1 | tee "$LOGFILE"

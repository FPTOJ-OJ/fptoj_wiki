#!/bin/bash

# Bật chế độ không buffer của Python để log hiện ra ngay lập tức
export PYTHONUNBUFFERED=1

echo "======================================================"
echo "  MkDocs Server is starting on http://localhost:8000"
echo "  Logs are being saved to log.txt"
echo "======================================================"
echo

# Chạy mkdocs serve và ghi log vào log.txt đồng thời hiển thị ra màn hình
# Sử dụng python3 nếu có, nếu không thì dùng python
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
else
    PYTHON_CMD="python"
fi

$PYTHON_CMD -m mkdocs serve -a localhost:8000 2>&1 | tee log.txt

if [ ${PIPESTATUS[0]} -ne 0 ]; then
    echo
    echo "[ERROR] MkDocs gặp lỗi khi chạy. Vui lòng kiểm tra log.txt"
fi

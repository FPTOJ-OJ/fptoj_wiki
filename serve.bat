@echo off
:: Thiết lập bảng mã UTF-8 để tránh lỗi font chữ
chcp 65001 > nul

:: Bật chế độ không buffer của Python để log hiện ra ngay lập tức
set PYTHONUNBUFFERED=1

echo ======================================================
echo   MkDocs Server is starting on http://localhost:8000
echo   Logs are being saved to log.txt
echo ======================================================
echo.

:: Sử dụng cmd.exe để gộp stdout và stderr trước, sau đó truyền vào Tee-Object
powershell -NoProfile -Command "cmd.exe /c `"python -m mkdocs serve -a localhost:8000 2>&1`" | Tee-Object -FilePath 'log.txt'"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] MkDocs gap loi khi chay. Vui long kiem tra log.txt
)
pause

@echo off
:: Zensical dev server (production cũng build bằng Zensical).
:: Chạy: serve.bat [port]
chcp 65001 > nul
setlocal

set PORT=%1
if "%PORT%"=="" set PORT=8000

set PYTHONUNBUFFERED=1

echo ======================================================
echo   Zensical server: http://localhost:%PORT%
echo   Log: log.txt
echo   Bam Ctrl+C de dung
echo ======================================================
echo.

echo [1/2] Chuan bi noi dung (matplotlib + mermaid)...
conda run python scripts\prepare_zensical.py
if errorlevel 1 (
    echo [ERROR] prepare_zensical.py that bai
    pause
    exit /b 1
)

echo [2/2] Theo doi docs/ va chay server...
start "" /b conda run python scripts\prepare_zensical.py --watch

powershell -NoProfile -Command "cmd.exe /c `"conda run zensical serve -f zensical.generated.yml -a localhost:%PORT% 2>&1`" | Tee-Object -FilePath 'log.txt'"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Zensical gap loi khi chay. Vui long kiem tra log.txt
)
pause

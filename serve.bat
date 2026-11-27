@echo off
rem Zensical dev server. Usage: serve.bat [port]
chcp 65001 > nul
setlocal

set PORT=%1
if "%PORT%"=="" set PORT=8000
set PYTHONUNBUFFERED=1

echo ======================================================
echo   Zensical: http://localhost:%PORT%  (log: log.txt)
echo   Ctrl+C de dung
echo ======================================================

echo [1/2] Chuan bi noi dung...
conda run python scripts\prepare_zensical.py
if errorlevel 1 ( echo [ERROR] prepare that bai & pause & exit /b 1 )

echo [2/2] Chay server (sua file trong docs/ se tu cap nhat)...
start "zensical-watch" /min conda run python scripts\prepare_zensical.py --watch
powershell -NoProfile -Command "cmd.exe /c `"conda run zensical serve -f zensical.generated.yml -a localhost:%PORT% 2>&1`" | Tee-Object -FilePath 'log.txt'"
taskkill /fi "windowtitle eq zensical-watch*" >nul 2>&1
pause

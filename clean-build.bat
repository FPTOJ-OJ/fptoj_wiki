@echo off
:: Xoa cache matplotlib va rebuild bang Zensical
chcp 65001 > nul
setlocal
set PYTHONUNBUFFERED=1

echo ======================================================
echo   Clean rebuild: xoa cache matplotlib va build lai
echo ======================================================
echo.

conda run python scripts\prepare_zensical.py --clean
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] prepare_zensical.py gap loi.
    pause
    exit /b 1
)

conda run zensical build -f zensical.generated.yml
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build gap loi. Xem output ben tren.
) else (
    echo.
    echo [OK] Build thanh cong voi cache moi.
)
pause

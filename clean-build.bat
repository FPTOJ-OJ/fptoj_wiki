@echo off
:: Xóa cache matplotlib và rebuild
chcp 65001 > nul
set PYTHONUNBUFFERED=1
set MKDOCS_CLEAN_MPL=1

echo ======================================================
echo   Clean rebuild: xoa cache matplotlib va build lai
echo ======================================================
echo.

python -m mkdocs build --strict 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build gap loi. Xem output ben tren.
) else (
    echo.
    echo [OK] Build thanh cong voi cache moi.
)
pause

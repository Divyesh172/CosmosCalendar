@echo off
title CosmosCommand - Deep Space Observatory
echo ========================================================
echo   COSMOSCOMMAND - DEEP SPACE MISSION CONTROL LAUNCHER
echo ========================================================
cd /d "%~dp0"
python server.py
if %ERRORLEVEL% NEQ 0 (
    echo Python not found in path, launching directly in browser...
    start "" index.html
)
pause

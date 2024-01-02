@echo off
setlocal enabledelayedexpansion

IF "%~2"=="" (
    echo Usage: run_gitleaks.bat ^<source_directory^> ^<report_directory^>
    exit /b 1
)

set SOURCE_DIR=%1
set REPORT_DIR=%2

docker run -v %SOURCE_DIR%:/tmp -v %REPORT_DIR%:/container-reports ghcr.io/gitleaks/gitleaks:latest detect -r=/container-reports/report.json --source="/tmp" -v

echo Gitleaks scan complete. Report saved in %REPORT_DIR%\report.json

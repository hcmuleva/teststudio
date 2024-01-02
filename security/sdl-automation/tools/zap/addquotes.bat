@echo off
setlocal enabledelayedexpansion

REM Check for input file argument
if "%~1"=="" (
    echo Usage: %~nx0 input_file
    exit /b
)

REM Check if input file exists
if not exist "%~1" (
    echo Error: File "%~1" not found.
    exit /b
)

REM Set the name for the output file
set "outputfile=output.txt"

REM Delete output file if it exists
if exist "%outputfile%" del "%outputfile%"

REM Read input file line by line and change the first character to a double quote
for /f "usebackq delims=" %%a in ("%~1") do (
    set "line=%%a"
    set "modifiedLine="!line:~1!"
    echo !modifiedLine! >> "%outputfile%"
)

echo Processing completed. Check "%outputfile%" for the result.
endlocal
exit /b

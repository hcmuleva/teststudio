@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

:: Check for correct number of arguments
IF "%~6"=="" (
    echo Usage: %0 ^<config/report path^> ^<openapi spec^> ^<report name^> ^<config file^> ^<hook file^> ^<sdl control^>
    exit /b 1
)

echo %~6
:: Set the provided parameters to variables
SET config_and_report_path=%~1
SET openapi_spec=%~2
SET report_name=%~3
SET config_file=%~4
SET hook_file=%~5
SET addons="-addoninstall ascanrulesAlpha -addoninstall ascanrulesBeta -addoninstall pscanrulesalpha -addoninstall pscanrulesbeta -addoninstall sqliplugin -addoninstall fileupload "
SET sdl_control=%~6
SET addons_sdl_control=%addons% and %sdl_control%

:: Run the Docker command
:: docker run -v !config_and_report_path!:/zap/wrk/:rw -t owasp/zap2docker-stable zap-api-scan.py -t !openapi_spec! -f openapi -r !report_name! -z "-c config-auth.prop" --hook=zap_custom_hooks.py -c !config_file!
:: docker run -v !config_and_report_path!:/zap/wrk/:rw -t owasp/zap2docker-stable zap-api-scan.py -t !openapi_spec! -f openapi -r !report_name! --hook=zap_custom_hooks.py -c !config_file!
docker run -v !config_and_report_path!:/zap/wrk/:rw -t ghcr.io/zaproxy/zaproxy:stable zap-api-scan.py -t !openapi_spec! -f openapi -r !report_name! -z !addons_sdl_control! --hook=!hook_file! -c !config_file!
:: Capture the last container ID that was run
FOR /f "tokens=*" %%i IN ('docker ps -l -q') DO SET last_container_id=%%i

:: Clean up by removing the container
docker rm !last_container_id!

ENDLOCAL
exit /b

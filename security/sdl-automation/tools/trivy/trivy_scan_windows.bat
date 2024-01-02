@echo off
SETLOCAL

REM Check if an argument is provided
IF "%~1"=="" (
    echo No image specified. Please provide the image name and tag.
    exit /b 1
)

REM Image to be scanned
SET IMAGE_TO_SCAN=%~1

REM File where the results should be stored
SET OUTPUT_FILE=trivy_results.txt

REM Pull the latest Trivy container image
docker pull aquasec/trivy

REM Use Trivy container to scan the desired image
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v %CD%:/results aquasec/trivy image --output /results/%OUTPUT_FILE% %IMAGE_TO_SCAN%

ENDLOCAL
exit /b 0

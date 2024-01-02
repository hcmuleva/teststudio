#!/bin/bash

# Check if the correct number of arguments are provided
if [ "$#" -ne 2 ]; then
    echo "Usage: ./run_gitleaks.sh <source_directory> <report_directory>"
    exit 1
fi

SOURCE_DIR="$1"
REPORT_DIR="$2"

docker run -v "${SOURCE_DIR}":/tmp -v "${REPORT_DIR}":/container-reports zricethezav/gitleaks:latest detect -r=/container-reports/report.json --source="/tmp" -v

# Notify the user
echo "Gitleaks scan complete. Report saved in ${REPORT_DIR}/report.json"

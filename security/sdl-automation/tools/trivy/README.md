# Trivy Container Image Scanner

This utility provides an easy way to scan Docker container images for vulnerabilities using the Trivy  scanner. The scan results will be outputted to a file in the same directory.

## Prerequisites

1. Ensure Docker is installed on your system.
2. Ensure the Docker daemon is running.

## How to Use

1. Execute the script `.\trivy_scan.bat <your_image_name:tag>` for Windows and `.\trivy_scan.sh <your_image_name:tag>` for Unix, replace `<your_image_name:tag>` with the name and tag of the Docker image you wish to scan. 

2. Once the scan completes, review the results in the `trivy_results.txt` file located in the same directory.



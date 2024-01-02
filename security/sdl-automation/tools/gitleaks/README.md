# Gitleaks Scan Automation Script

This document provides guidance on using the automation scripts to run a Gitleaks scan via Docker. Depending on your operating system, use either the Bash script (for Unix-like systems) or the Batch script (for Windows).

## Prerequisites

- **Docker** installed on your machine.

- **Gitleaks Docker image**. Pull docker image:
  ```bash
  docker pull ghcr.io/gitleaks/gitleaks:latest

## Usage

### For Linux

- **Grant execution permissions to the Bash script**:
  
  ```bash
  chmod +x run_gitleaks.sh

Run the script with the source and report directories as arguments:
  ```bash
    ./run_gitleaks.sh /path/to/source /path/to/reports
```
### For Windows
- Open Command Prompt or PowerShell.
- Navigate to the directory containing the Batch script and run:
  ```bash
    ./run_gitleaks.sh /path/to/source /path/to/reports

**Upon completion, you'll find the scan report in your specified report directory.**



# ZAP - SDL Automation Scan

Run ZAP website security scan for the following SDL Control Testing
- Prevent OS Command Injection
- Perform Input Validation
- Do Not Mix Code and Unvalidated Data 
- Secure Headers or HTTP Security Headers

## Prerequisites

- Docker installed on your machine.
- The ZAP Proxy Docker image You can pull it using 

    `docker pull ghcr.io/zaproxy/zaproxy:stable`.

## Steps to Run

1. **Choose Open API Specifications File:**  
   You need to have an Open API specifications file for the scan stored in same directory as the config

2. **Add Authorization token to the Configuration file**  
   You need to replace the `token` in the `auth_token_add.js` file with the required authorization token

3. **Select Configuration Based on SDL Control:**  
   There are different configurations available based on the SDL control. Choose the appropriate configuration file for the SDL Control.

## Running the ZAP Scan
   
4. **Execute the Script**: Run the script with the required parameters in the following order:
   - Path to the configuration and report
   - OpenAPI specification file
   - Report name
   - Configuration file 
   - Hook file name

   ```bash
   run_zap_scan_windows.bat [PATH_TO_CONFIG_AND_REPORT] [OPEN_API_SPEC_FILE] [REPORT_NAME] [CONFIGURATION_FILE] [HOOK_FILE]

Once the scan is complete, you will find the zap-report.html in the specified configuration and report directory
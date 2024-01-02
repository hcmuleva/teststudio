# get a source code and report dir in  the argument.
# run the docker command, and generate report, send execution details to the controller.
import subprocess
import os
import json
from datetime import datetime
import requests
import time
import shutil
from flask import jsonify

def rungitleaks(request):

    # Parse the data from  the request
    if 'data' not in request.form:
        return jsonify({'error': 'JSON data is missing'}), 400

    try:
        json_data = json.loads(request.form['data'])
    except ValueError as e:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    src_dir = json_data["src"]
    report_dir = json_data["report_dir"]


    # Run docker command and compute the time taken
    docker_command = f'docker run -v "${src_dir}":/tmp -v "${report_dir}":/container-reports ghcr.io/gitleaks/gitleaks:latest detect -r=/container-reports/report.json --source="/tmp" -v'
    start_time = time.time()
    try:
        subprocess.run(docker_command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Subprocess error: {e.stderr}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        end_time = time.time()
        execution_time = end_time - start_time

    
    # Create folder for report
    folder_name = f"SDL_GITLEAKS_{datetime.now().strftime('%Y-%m-%d-%H%M%S')}"
    directory_path = "/home/results/reports"
    folder_path = os.path.join(directory_path, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    
    
    # Copy the report file to the report folder
    try:
        shutil.copy('/container-reports/report.json', folder_path)
    except Exception as e:
        print(f"Failed to copy file: {e}")
        

    # Send data to controller
    reporturl = f"http://localhost:1337/report/report/{folder_name}/report.json"
    payload = {"data": {"reporturl": reporturl, "testtype": "SDL", "status": "Completed", "duration": str(execution_time)}}
    response = requests.post(f'http://localhost:1337/api/results', headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
    return response
import subprocess
import configparser
import os
import tempfile  # Import the tempfile module
from datetime import datetime

import requests
def run_test_service(url, tags,image, image_version,folder_path, folder_name,dockervolume ):
    controller_url_env = os.environ.get("controller_url")
    centralized_server_env = os.environ.get("centralized_server")
    controller_url = f'{controller_url_env}{url}'   
    response = requests.get(controller_url)
    if response.status_code == 200:
        ini_content = '[temporary_section]\n' + response.content.decode('utf-8')
        config = configparser.ConfigParser()
        config.read_string(ini_content)
        #tags_string = ','.join(tag.strip() for tag in tags)
        if tags is not None:
            #tags_string = ','.join(tag.strip() for tag in tags)
            config.set('temporary_section', 'TEST_SCENARIO_TAGS', tags)

        # Use tempfile to create a temporary environment file
        env_variables = []
        for key, value in config.items('temporary_section'):
            env_variables.append(f"{key.upper()}={value}")
        env_file_content = '\n'.join(env_variables)
        
        with tempfile.NamedTemporaryFile(delete=False, mode='w') as temp_env_file:
            temp_env_file.write(env_file_content)
            temp_env_file_path = temp_env_file.name
            print("Temp env file path", temp_env_file_path, "\n\n\n")
        # Define your Docker command
        docker_command = (
            f"docker run -it --network=\"host\" "
            f"-v {folder_path}:{dockervolume} "
            f"--env-file {temp_env_file_path} "
            f"{image}:{image_version}"
        )
        print("Docker command", docker_command, "\n\n\n")
        subprocess.run(docker_command, shell=True, check=True)
        # Remove the temporary file after Docker execution completes
        subprocess.run(f"rm {temp_file_path}", shell=True)
        reporturl = f"{centralized_server_env}/report/report/{folder_name}/cucumber-html-reports/overview-features.html"
        payload = {"data": {"reporturl": reporturl, "testtype": "FUNCTIONAL", "status": "Completed", "duration": str(execution_time)}}

        response = requests.post(f'{controller_url_env}/api/results', headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
        return response
    else:
        raise Exception(f"Failed to retrieve env file from {controller_url}")

def runfunctionaltest(json_obj):
     print("JSON OBJ", json_obj, " \n\n\n")
     hostname=json_obj['data']['host']
     tags = None
     try:
        tags = json_obj['data']['tags']
     except KeyError:
        tags = None
     env_file_url=json_obj['data']['inifile']
     testprojectpath=json_obj['data']['testprojectpath']    
     testprojectversion=json_obj['data']['testprojectversion']
     timestamp = datetime.now().strftime("%Y-%m-%d-%H%M%S")
     base_directory = ''
     hostvolume=''
     if os.name == 'posix':  # Posix is used for Unix/Linux
        base_directory = "/home/results/reports"
     else:
        base_directory = 'C:\\temp'
     folder_name = f"Karate{datetime.now().strftime('%Y-%m-%d-%H%M%S')}"
     folder_path = os.path.join(base_directory, folder_name)
     os.makedirs(folder_path, exist_ok=True)
     dockervolume="/usr/src/app/target"
     run_test_service(env_file_url,tags,testprojectpath, testprojectversion, folder_path,folder_name, dockervolume)
     return {"status": "success", "message": "SDL test is running"}
    
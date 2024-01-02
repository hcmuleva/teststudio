import subprocess
import configparser
import os
import tempfile  # Import the tempfile module
from datetime import datetime

import requests
def run_test_service(url, tags,image, image_version,hostvolume, dockervolume ):
    controller_url_env = os.environ.get("controller_url")

    controller_url = f'{controller_url_env}{url}'   
    response = requests.get(controller_url)
    if response.status_code == 200:
        ini_content = '[temporary_section]\n' + response.content.decode('utf-8')
        config = configparser.ConfigParser()
        config.read_string(ini_content)
        tags_string = ','.join(tag.strip() for tag in tags)
        config.set('temporary_section', 'TEST_SCENARIO_TAGS', tags_string)        
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
            f"-v {hostvolume}:{dockervolume} "
            f"--env-file {temp_env_file_path} "
            f"{image}:{image_version}"
        )
        print("Docker command", docker_command, "\n\n\n")
        subprocess.run(docker_command, shell=True, check=True)
        # Remove the temporary file after Docker execution completes
        subprocess.run(f"rm {temp_file_path}", shell=True)
    else:
        raise Exception(f"Failed to retrieve env file from {controller_url}")

def runsdl(json_obj):
     aut=json_obj['data']['host']
     tags=json_obj['data']['tags']
     env_file_url=json_obj['data']['inifile']
     testprojectpath=json_obj['data']['testprojectpath']    
     testprojectversion=json_obj['data']['testprojectversion']
     timestamp = datetime.now().strftime("%Y-%m-%d-%H%M%S")
     directory_name = f"sdl_run_{timestamp}"
     hostvolume=''
     if os.name == 'posix':  # Posix is used for Unix/Linux
        base_directory = '/tmp'
     else:
        base_directory = 'C:\\temp'
     full_directory_path = os.path.join(base_directory, directory_name)
     os.makedirs(full_directory_path)
     hostvolume=full_directory_path
     dockervolume="/usr/src/app/target"
     run_test_service(env_file_url,tags,testprojectpath, testprojectversion, hostvolume, dockervolume)
     return {"status": "success", "message": "SDL test is running"}
    
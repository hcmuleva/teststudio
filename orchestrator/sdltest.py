import subprocess
import configparser
import os
import json
import yaml
import tempfile  # Import the tempfile module
from datetime import datetime
import requests
import time
import shutil
from pathlib import Path
from flask import jsonify 

def save_file_to_path(data, volume_mount, aut, apipath, is_json=True):
    newurl = aut + apipath
    new_servers_value = [{"url": newurl, "description": "Updated server url"}]
    
    # Check if data is in JSON format, else assume YAML
    if is_json:
        data_object = json.loads(data)
    else:
        data_object = yaml.safe_load(data)
    
    data_object["servers"] = new_servers_value

    # Generating file path
    file_extension = "json" if is_json else "yaml"
    opeapifile = f"updated_openapi_{datetime.now().strftime('%Y-%m-%d-%H%M%S')}.{file_extension}"
    opeapifilepath = os.path.join(volume_mount, opeapifile)

    # Writing to the file
    with open(opeapifilepath, "w") as f:
        if is_json:
            json.dump(data_object, f)
        else:
            yaml.dump(data_object, f, default_flow_style=False)

    return opeapifile

def save_file_to_path_old(json_object, volume_mount, aut,apipath):
    newurl=aut+apipath
    new_servers_value = [{"url": newurl, "description": "Updated server url"}]
    json_object["servers"] = new_servers_value
    opeapifile ="updated_openapi"+ datetime.now().strftime("%Y-%m-%d-%H%M%S")+".json"
    opeapifilepath = os.path.join(volume_mount, opeapifile)
    with open(opeapifilepath, "w") as f:
        json.dump(json_object, f)
    return opeapifile

def runzapsdl(request):
    if 'data' not in request.form:
        return jsonify({'error': 'JSON data is missing'}), 400

    try:
        json_data = json.loads(request.form['data'])
    except ValueError as e:
        return jsonify({'error': 'Invalid JSON data'}), 400
    # Extract required values from json_data
    aut = json_data['host']
    userid = json_data['users_permissions_user']
    volume_mount = json_data['mountpath']
    apipath = json_data['apipath']
    configid = json_data['configid']
    configfile = json_data['configfile']
    sdl_control = configfile.split(".")[0]
    opeapifile = None
    authtoken=json_data['authToken']
    controller_url_env = os.environ.get("controller_url")
    centralized_server_env = os.environ.get("centralized_server")

    # Handle file upload or fetch from URL
    if 'file' in request.files:
        file = request.files['file']
        #json_obj = json.load(file)
        try:
            opeapifile = save_file_to_path(file, volume_mount, aut, apipath, True)
        except:
            try:
                opeapifile = save_file_to_path(file, volume_mount, aut, apipath, False)
            except:
                return jsonify({'error': 'The content of the OpenAPI spec is not in JSON or YAML'}), 400
        
    else:
        openapiurl = json_data['openAPIfile']
        controller_url = f'{controller_url_env}{openapiurl}'
        response = requests.get(controller_url)
        if response.status_code == 200:
            is_json = 'json' in response.headers.get('Content-Type', '').lower()
            opeapifile = save_file_to_path(response.content, volume_mount, aut, apipath, is_json)

    
    # Write auth token to a temp file
    token_file_path = os.path.join(volume_mount, 'temp_auth_token.txt')
    with open(token_file_path, 'w') as file:
        file.write(authtoken)

    # Constructing Docker command
    addons = "-addoninstall ascanrulesAlpha -addoninstall ascanrulesBeta -addoninstall pscanrulesalpha -addoninstall pscanrulesbeta -addoninstall sqliplugin -addoninstall fileupload"
    addons_sdl_control = f'{addons} -sdlcontrol {sdl_control}'
    docker_command = f'docker run -v {volume_mount}:/zap/wrk/:rw -t ghcr.io/zaproxy/zaproxy:stable zap-api-scan.py -t {opeapifile} -f openapi -r zap_report.html -z "{addons_sdl_control}" --hook=hook.py -c {configfile}'

    # Running Docker command
    start_time = time.time()
    try:
        subprocess.run(docker_command, shell=True, check=True)
        print("ZAP command ran successfully")
    except subprocess.CalledProcessError as e:
        print(f"Subprocess error: {e.stderr}")
        #return jsonify({'error': 'Error running Docker command'}), 500
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        #return jsonify({'error': 'Unexpected error occurred'}), 500
    finally:
        end_time = time.time()
        execution_time = end_time - start_time
    print("++++++++++++++++++++++++++++++++++++++++++++++++")
    # Creating folder for report
    folder_name = f"SDL_ZAP_{datetime.now().strftime('%Y-%m-%d-%H%M%S')}"
    directory_path = "/home/results/reports"
    folder_path = os.path.join(directory_path, folder_name)
    os.makedirs(folder_path, exist_ok=True)
    print("++++++++++++++++++++++++++++++++++++++++++++++++")
    
    # Copy result file and delete temp token file
    try:
        shutil.copy(os.path.join(volume_mount, 'zap-report-pretty.html'), folder_path)
        shutil.copy(os.path.join(volume_mount, 'zap-report-raw.json'), folder_path)
        shutil.copytree(os.path.join(volume_mount, 'zap-report-pretty'), os.path.join(folder_path, 'zap-report-pretty'))
        os.remove(token_file_path)
    except Exception as e:
        print(f"Failed to copy file or deleting temp token file: {e}")
        #return jsonify({'error': 'Failed to copy report file'}), 500

    # Sending data to controller
    reporturl = f"{centralized_server_env}/report/report/{folder_name}/zap-report-pretty.html"
    payload = {"data": {"reporturl": reporturl, "config": configid, "users_permissions_user": userid, "aut": aut, "testtype": "SDL", "status": "Completed", "control": configfile, "duration": str(execution_time)}}
    print(payload)
    response = requests.post(f'{controller_url_env}/api/results', headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
    print("++++++++++++++++++++++++++++++++++++++++++++++++")
    print("Response from service for result", response.content, " Response status", response.status_code)
    return "Successfully updated Result. You can check the result section"

def rungitleaks(request):
    # Parse the data from  the request
    if 'data' not in request.form:
        return jsonify({'error': 'JSON data is missing'}), 400

    try:
        json_data = json.loads(request.form['data'])
    except ValueError as e:
        return jsonify({'error': 'Invalid JSON data'}), 400
    
    controller_url_env = os.environ.get("controller_url")
    centralized_server_env = os.environ.get("centralized_server")

    src_dir = Path(json_data["host"]).as_posix()
    report_dir = Path(json_data["mountpath"]).as_posix()

    # Run docker command and compute the time taken
    docker_command = f'docker run -v {src_dir}:/gitleaks/path/ -v {report_dir}:/gitleaks-reports/ zricethezav/gitleaks:latest detect -r=/gitleaks-reports/report.json --source=/gitleaks/path/'
    start_time = time.time()
    try:
        subprocess.run(docker_command, shell=True, check=True)
        print("Ran Gitleaks command successfully")
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
        shutil.copy(os.path.join(json_data["mountpath"], 'report.json'), folder_path)
    except Exception as e:
        print(f"Failed to copy file: {e}")
        

    # Send data to controller
    reporturl = f"{centralized_server_env}/report/report/{folder_name}/report.json"
    payload = {"data": {"reporturl": reporturl, "testtype": "SDL", "status": "Completed", "duration": str(execution_time)}}
    response = requests.post(f'{controller_url_env}/api/results', headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
    return response

def runzapsdlold(request):
    if 'data' not in request.form:
        return jsonify({'error': 'JSON data is missing'}), 400

    json_data = request.form['data']
    # Parse the JSON data
    try:
        json_data = json.loads(json_data)
        print("json_data", json_data, "\n\n\n")
    except ValueError as e:
        return jsonify({'error': 'Invalid JSON data'}), 400

    # Check if a file is included in the request
    opeapifile = None
    aut=json_data['host']
    userid=json_data['users_permissions_user']
    volume_mount = json_data['mountpath']
    apipath=json_data['apipath']
    configid=json_data['configid']
    authtoken=json_data['authToken']
    authconfigpath=os.path.join(volume_mount, 'config-auth.prop')
    updatedauthconfigpath=os.path.join(volume_mount, 'updated-config-auth.prop')
    authtokenreplacement = f"sed 's/BEARER_AUTH_TOKEN/{authtoken}/g'  {authconfigpath} > {updatedauthconfigpath}"
    subprocess.run(authtokenreplacement, shell=True, check=True)
    controller_url_env = os.environ.get("controller_url")
    centralized_server_env = os.environ.get("centralized_server")
    if 'file' in request.files:
        file = request.files['file']
        json_obj = json.load(file)
        opeapifile=save_file_to_path(json_obj, volume_mount,aut,apipath)   
    else:
        openapiurl=json_data['openAPIfile']
        controller_url = f'{controller_url_env}{openapiurl}'   
        response = requests.get(controller_url)
        print(response)
        if response.status_code == 200:
            json_object = json.loads(response.content)
            opeapifile=save_file_to_path(json_object, volume_mount,aut,apipath)
    configfile=json_data['configfile']
    print("openapi file path", opeapifile, "\n\n\n End \n\n\n")
    docker_command = f'docker run -v {volume_mount}:/zap/wrk/:rw -t owasp/zap2docker-stable:2.12.0 zap-api-scan.py -t {opeapifile} -f openapi -r index.html -z "-c updated-config-auth.prop -addoninstall ascanrulesAlpha -addoninstall sqliplugin" --hook=zap_custom_hooks.py -c {configfile}'
    print("Docker command", docker_command, "\n\n\n")
    start_time = time.time()  # Record the start time

    try:
        subprocess.run(docker_command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print("called process error: ", e.stderr)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:    
        end_time = time.time()  # Record the end time
        execution_time = end_time - start_time
        folder_name=f"SDL_ZAP_" + datetime.now().strftime("%Y-%m-%d-%H%M%S")
        directory_path="/home/results/reports"
        # directory_path="\\\localhost\C$\Testplatform\\testplatform\\Results"
        folder_path=os.path.join(directory_path,folder_name)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
            print(f"Folder '{folder_name}' created at {folder_path} ")
        else:
            print(f"Folder '{folder_name}' already exists at {folder_path}")
        
        '''
        TBD:
        1) We have now place folder rawdata in backend where we can push terminal out of execution.
    
        '''
        reporturl=f"{centralized_server_env}/report/report/{folder_name}/index.html"
        payload ={"data":{"reporturl":reporturl, "config":configid, "users_permissions_user": userid,"aut":aut, "testtype":"SDL", "status":"Completed", "control":configfile, "duration":execution_time}}
        controller_url = f'{controller_url_env}/api/results'
        headers = {'Content-Type': 'application/json'}
        response = requests.post(controller_url, headers=headers, data=json.dumps(payload))
        copy_result_file_abs =os.path.join(volume_mount,'index.html')
        copy_result_file = f'cp {copy_result_file_abs} {folder_path}'
        subprocess.run(copy_result_file, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True, check=True)
        print("Response from service for result", response.content, " Response status", response.status_code)
        return "Successfully updated Result. You can check the resul section"

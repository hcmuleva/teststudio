from flask import Flask, request
import xml.etree.ElementTree as ET
import requests
import subprocess
import os 
import time
import re
from datetime import datetime, timedelta

import io
import tempfile
from flask_cors import CORS
import yaml
from deploy import *
from gitupdate import *
from influxdbupdater import *
from jmeterupdater import *
import platform
import threading
import random
import string
import json
import concurrent.futures

# import logging

root_path = os.path.abspath('.')
test_engine_path = os.path.dirname(root_path)
# logging.basicConfig(level=logging.WARNING, format='%(message)s')

primary_worker_namespace = "jmeterms"
primary_chart_directory = os.path.join(test_engine_path, "services", "helmcharts", "Primary")
primary_release_name = "primary"
worker_chart_directory = os.path.join(test_engine_path, "services", "helmcharts", "Worker")
worker_release_name = "worker"
values_file = "values.yaml"
temp_file_obj={}

thread_logs = []

def generate_random_string(length):
    chars = string.ascii_lowercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

''' 
This is to deploy jmeter in a given namespace.
'''

def deploypod(namespace):
    if namespace is None:
        system.error(-1)
    delete_release(primary_release_name, namespace)
    delete_release(worker_release_name, namespace)
    delete_namespace(namespace)
    create_namespace(namespace)
    

    try:
        deploy_chart(primary_release_name,primary_chart_directory,namespace)
        print("primary Helm deployment completed successfully!")
    except RuntimeError as e:
        print(f"Error deploying primary Helm chart: {e}")

    try:
        deploy_chart(worker_release_name,worker_chart_directory,namespace)
        print("worker Helm deployment completed successfully!")
    except RuntimeError as e:
        print(f"Error deploying worker Helm chart: {e}")


def updateparams(content,workload_item, influxdbobj,namespace):
    root = ET.fromstring(content)
    thread_group = root.find(".//ThreadGroup")
    http_sampler = root.find(".//HTTPSamplerProxy")
    total_workers=None
    if influxdbobj:
        influxdbupdate(influxdbobj,root)
    # SET JMETER PARAMETER (ramp_up time, loop count, threads)
    jmeterupdate(workload_item, root,http_sampler)

    total_workers= workload_item['total_workers']
    print("Total Workds ", total_workers)

    modified_file = io.BytesIO(ET.tostring(root))
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        tmp_file.write(modified_file.getvalue())
        tmp_file_path = tmp_file.name
        file_name = os.path.basename(tmp_file_path)
        temp_file_obj[namespace] =tmp_file_path
    print("Created Temp file", file_name,  " Name Space", namespace )
def deploy_jmeter_pods(total_pods, ns):
    controller_url_env = os.environ.get("controller_url")
    file_path = os.path.join(worker_chart_directory,values_file)
    with open(file_path, 'r') as f:
        deployment = yaml.safe_load(f)
        # Update the replicas field
        deployment['jmeter_worker_deploy'] = int(total_pods)
            # Write the updated YAML back to the file
        with open(file_path, 'w') as f:
            yaml.dump(deployment, f, default_flow_style=False)
        print(f"Updated {file_path} with replicas count: {deployment['jmeter_worker_deploy']}")
        deploypod(ns)
        time.sleep(10)
def  parallel_execution(namespace, primary_pod_name,confgid,userid,wll_data):
    start_time = datetime.now()
    controller_url_env = os.environ.get("controller_url")
    print("Paralel Execution startd", namespace , " Primary Pod name", primary_pod_name, "Work load ", wll_data)
    run_test = f'kubectl exec -it -n {namespace} "{primary_pod_name}" -- /bin/bash /load_test hcm1test.jmx'
    print("command for execution", run_test)
    process = subprocess.Popen(run_test, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True)
    process.wait()  # Wait for the command to complete
    payload={}
    end_time = datetime.now()
    duration = end_time - start_time
    formatted_duration = str(duration)
    if process.returncode == 0:
        stdout = process.stdout
        stdout_result=stdout.read()
        print("JMeter load test completed successfully. %s", stdout_result)
        pattern = r"summary\s+=\s+(\d+)\s+in\s+(\d{2}:\d{2}:\d{2})\s+=\s+(\d+\.\d+)/s\s+Avg:\s+(\d+)\s+Min:\s+(\d+)\s+Max:\s+(\d+)\s+Err:\s+(\d+)\s+\((\d+\.\d+%)\)"
        match = re.search(pattern, stdout_result)
        summary=""
        test_status="SUCCESS"
        #I changed the code here because 100.00 also have 0.00
        
        if match:
            summary = match.group(0)
            if('100.00%' in summary):
                print("Failed")
                test_status="FAILED"
            else:
                print("Success")
                test_status="SUCCESS"
            print(summary)
        payload ={"data":{"rawdata":stdout_result, "config":confgid, "users_permissions_user": userid,"totalthreads":str(wll_data['threadcount']),"loops":str(wll_data['loop_count']), "total_workers":str(wll_data['total_workers']),"aut":str(wll_data['aut']), "filepath":str(wll_data['filepath']), "duration":str(duration),"summary":str(summary), "status":str(test_status), "testtype":"PERFORMANCE"}}
        thread_logs.append(stdout_result)
        controller_url = f'{controller_url_env}/api/results'
        headers = {'Content-Type': 'application/json'}
        response = requests.post(controller_url, headers=headers, data=json.dumps(payload))
        print("Response from service for result", response.content, " Response status", response.status_code)
        return "Successfully updated Result. You can check the resul section"
    else:
        stderr = process.stderr
        print(stderr)
        print("JMeter load test failed.")      
        return stderr
    if namespace is not None:
        delete_namespace(namespace)

def run_test_async(json_obj):
    try:
         
        workload_for_namespace={}
        primary_pod_name_object={}
        controller_url_env = os.environ.get("controller_url")
        workload_list=json_obj['data']['wll'] 
        confgid=json_obj['data']['config']
        userid=json_obj['data']['users_permissions_user']
        influxdbobj = None
        if 'influxdb' in json_obj['data'] and  json_obj['data']['influxdb']:
            influxdbobj = json_obj['data']['influxdb'] 
        ''' 
        Step1:  get JMX file
        Step2:  Iterate for each of the file.
                a) get random string of name space and push this value in array with below formate       
                b) Update deployment value file with total works pod value. and create a deployment.
                c) copy temp file also in master.
            [{namespace:"", tempfile:""}]     
        Step3: Run Test
        Step4: Clear the deployments to release resource.                  
        ''' 
        controller_url = f'{controller_url_env}{json_obj["data"]["jmxfile"]}'
        response = requests.get(controller_url)
        content =response.content  
    
        '''Below block need to get list of WLL and iterate and each iteration will create one deployment'''
        
        for workload_item in workload_list:
            namespace = generate_random_string(4) 
            updateparams(content,workload_item,influxdbobj,namespace)
            deploy_jmeter_pods(workload_item['total_workers'], namespace)
            get_primary_pod = "kubectl get pods -n %s -l=jmeter_mode=primary -o jsonpath='{.items[0].metadata.name}'"%(namespace)
            print("Get_Primary pod ",  get_primary_pod)
            primary_get = subprocess.run(get_primary_pod, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True, check=True)
            primary_pod_name = primary_get.stdout.strip().strip("'")
            print("Primary Pod name", primary_pod_name)
                    
            tmp_file_path=temp_file_obj[namespace]
            # execute the command
            dirpath, filename = os.path.split(tmp_file_path)    
            current_os = platform.system()
            if current_os == "Windows":
                os.chdir(dirpath)
                copy_test_file = f"kubectl cp {filename} -n {namespace} {primary_pod_name}:/hcm1test.jmx"
            elif current_os == "Darwin" or current_os == "Linux":
                copy_test_file = f"kubectl cp {tmp_file_path} -n {namespace} {primary_pod_name}:/hcm1test.jmx"
            print("Copying test file: %s", copy_test_file)
            subprocess.run(copy_test_file, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True, check=True)
            temp_file_obj[namespace]=tmp_file_path
            primary_pod_name_object[namespace] = primary_pod_name
            workload_for_namespace[namespace] = workload_item
            #remove temporary file
            # os.remove(tmp_file_path)
            # if tmp_file_path:
            #     os.remove(tmp_file_path)
        print("Running JMeter load test...")
        
        threads = []
        for key, value in primary_pod_name_object.items():
            wll_data=workload_for_namespace[key]
            thread = threading.Thread(target=parallel_execution, args=(key, value,confgid,userid,wll_data))
            threads.append(thread)
            thread.start()
        # Wait for all threads to finish
        for thread in threads:
            thread.join()
        
        return thread_logs
        
    except subprocess.CalledProcessError as err:
        print("Error occurred while running command:", err)
        return str(err)
        
    except Exception as err:
        print("Unexpected error occurred:", err)
        return str(err)

def runperformancetest(json_obj):
    result = run_test_async(json_obj)
    return result
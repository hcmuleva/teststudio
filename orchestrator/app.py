from flask import Flask, request, jsonify
from flask_cors import CORS
import functional
import json
import unit
import filedownloadperf
import otherperformance
import sdl
import sdltest
import os
app = Flask(__name__)
CORS(app)

@app.route('/sdl', methods=['GET','POST'])
def sdl_run_test():
    print("Request Recieved",request)
    json_data = request.form['data']
    json_obj = json.loads(json_data)
    # Check if a JSON payload is provided in the request body
    
    print("Request object", json_obj)
    framework=json_obj['framework']
    print("json_obj", json_obj)
    if framework == 'ZAP':
        result = sdltest.runzapsdl(request)
        return jsonify(result)
    elif framework == 'GITLEAKS':
        result = sdltest.rungitleaks(request)
        return result.json()
    else:
        result = sdl.runsdl(json_obj)
        return  jsonify(result) 
   
        #file.save('C:\\temp\\test.json')

    # Perform file handling here, for example, save the file to a desired location
    # file.save('/path/to/save/file')

    # You can now use the JSON data and the uploaded file as needed
   
   
@app.route('/unit', methods=['GET','POST'])
def unit_run_test():
    print("Unit Test Request ")
    result = unit.rununittest(request)
    return  jsonify(result) 
@app.route('/functional', methods=['GET','POST'])
def functional_run_test():
    # result = functional.runfunctionaltest()
    # return  jsonify(result) 
    print("Request Recieved",request)

    json_obj = request.json
    #json_obj = json.loads(json_data)
    # Check if a JSON payload is provided in the request body
    
    print("Request object", json_obj)
    #framework=json_obj['framework']
    print("json_obj", json_obj)
    result = functional.runfunctionaltest(json_obj)
    return jsonify(result)
    
   
   


@app.route('/performance', methods=['GET','POST'])
def performance_run_test():
     json_obj = request.json  
     print("Request object", json_obj)
     auttype=json_obj['data']['auttype'] 
     if auttype == 'FILEDOWNLOAD':
        result = filedownloadperf.runperformancetest(json_obj)
        return  jsonify(result)
     else: 
        result = otherperformance.runperformancetest(json_obj)
        return  jsonify(result) 

        
if __name__ == "__main__":
    
    try:
        with open('env.json', 'r') as config_file:
            config_data = json.load(config_file)

        controller_url = config_data.get('controller_url')
        report_path = config_data.get('report_path')

       
    except FileNotFoundError:
        print('Configuration file (config.json) not found.')
    
    for key, value in config_data.items():
       
        os.environ[key] = value
        print(f'Set environment variable {key}={value}')
    # api_key = os.environ.get('api_key')
    # server_url = os.environ.get('server_url')
    # debug_mode = os.environ.get('debug_mode')
    app.run(debug=True, host='0.0.0.0')

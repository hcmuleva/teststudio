import os
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/runmvn', methods=['POST', 'GET'])
def run_maven():
    command = "mvn clean test -Dtest=com.example.TestRunner"
    current_dir = os.getcwd()
    print("Current working directory: ", current_dir, flush=True)
    # Execute the Maven command
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, text=True)
    stdout, stderr = process.communicate()
    if process.returncode == 0:
        print("Command completed successfully.", flush=True)
        return jsonify({"output": stdout})
    else:
        print("Command failed.", flush=True)
        print(stderr, flush=True)
        return jsonify({"error": stderr})

@app.route('/karate-results')
def get_karate_results():
    with open('target/karate-reports/karate-summary.html', 'r') as f:
        contents = f.read()
    return jsonify({'contents': contents})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

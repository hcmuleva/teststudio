import subprocess
import time

namespace = "argocd"
password = "Welcome@123"

# Check if namespace already exists, delete and recreate if necessary
existing_namespaces = subprocess.check_output(["kubectl", "get", "namespaces", "-o", "jsonpath='{.items[*].metadata.name}'"], text=True)
if namespace in existing_namespaces:
    delete_namespace = input(f"The namespace {namespace} already exists. Do you want to delete it and recreate? (y/n): ")
    if delete_namespace.lower() == "y":
        subprocess.run(["kubectl", "delete", "namespace", namespace], check=True)
    else:
        print(f"Exiting script. Namespace {namespace} already exists.")
        exit()
subprocess.run(["kubectl", "create", "namespace", namespace], check=True)

# Installing Argo CD
subprocess.run(["kubectl", "apply", "-n", namespace, "-f", "https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml"], check=True)

# Accessing the Argo CD API server
subprocess.run(["kubectl", "patch", "svc", "argocd-server", "-n", namespace, "-p", '{"spec": {"type": "LoadBalancer"}}'], check=True)

# Check if Argo CD pods are ready
print("Waiting for the Argo CD server pods to be ready...")
argocd_pod = ""
while True:
    pod_info = subprocess.check_output(["kubectl", "get", "pod", "-n", namespace, "-l", "app.kubernetes.io/name=argocd-server", "-o", "jsonpath='{.items[0].metadata.name} {.items[0].status.phase}'"], text=True).strip("'")
    if pod_info:
        pod_name, pod_status = pod_info.split()
        if pod_status == "Running":
            argocd_pod = pod_name
            break
    time.sleep(5)
print("Argo CD server pods are ready.") 

# Retrieving the initial password for the Argo CD web UI
kubectl_cmd = f"kubectl -n {namespace} get secret argocd-initial-admin-secret -o jsonpath={{.data.password}} | base64 -d"
initial_password_process = subprocess.Popen(kubectl_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
initial_password, err = initial_password_process.communicate()

if err:
    print(f"Error: {err.decode()}")
    exit()

initial_password = initial_password.decode().strip()

print(f"Your Initial Password is: {initial_password}")
print(f"To change password you need to login you can do by using command: 'argocd login localhost:443 --username admin --password {initial_password}'")
print("You can password by using command: 'argocd account update-password'")

# Starting port forwarding to make the Argo CD web UI available
print("Starting port forwarding to make the Argo CD web UI available...")
print("The Argo CD web UI will be available at http://localhost:8080")
subprocess.Popen(["kubectl", "port-forward", "svc/argocd-server", "-n", namespace, "8080:443"])
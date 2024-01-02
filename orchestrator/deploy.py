import subprocess
import time
import os

def delete_release(release_name: str, namespace: str) -> None:
    # Check if the release exists, and delete it if it does
    check_command = f"helm ls -n {namespace} -q | grep {release_name}"
    print("DELETE RELEASE ", check_command)
    try:
        releases = subprocess.check_output(f"helm ls -n {namespace} -q", shell=True, stderr=subprocess.STDOUT).decode().strip()
        print("Before if and run command ", releases)
        if release_name in releases:
            print(f"Found existing release {release_name}. Deleting...")
            subprocess.run(f"helm delete {release_name} -n {namespace}", shell=True, check=True)
            print(f"Release {release_name} deleted.")
        else:
            print(f"No existing release found with name {release_name}.")
    except subprocess.CalledProcessError as e:
        print(f"Error checking Helm release: {e.output.decode()}")


def delete_namespace(namespace: str) -> None:
    # Check if the namespace exists, and delete it if it does
    check_namespace_command = f"kubectl get namespace {namespace} -o name"
    try:
        namespace_exists = subprocess.check_output(check_namespace_command, shell=True, stderr=subprocess.STDOUT).decode().strip()
        if namespace_exists:
            print(f"Namespace {namespace} exists. Deleting...")
            delete_namespace_command = f"kubectl delete namespace {namespace}"
            subprocess.run(delete_namespace_command, shell=True, check=True)
            print(f"Namespace {namespace} deleted.")
        else:
            print(f"No namespace found with name {namespace}. Skipping deletion.")
    except subprocess.CalledProcessError:
        print(f"No namespace found with name {namespace}. Skipping deletion.")


def package_chart(chart_directory: str, output_directory: str) -> None:
    # Package the Helm chart
    package_command = f"helm package {chart_directory} -d {output_directory}"
    try:
        print(f"Packaging Helm chart from directory {chart_directory}...")
        subprocess.run(package_command, shell=True, check=True)
        print(f"Helm chart packaged successfully.")
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Error packaging Helm chart: {e.output.decode()}")


def create_namespace(namespace: str) -> None:
    # Create the namespace
    create_namespace_command = f"kubectl create namespace {namespace}"
    try:
        subprocess.run(create_namespace_command, shell=True, check=True)
        print(f"Namespace {namespace} created.")
    except subprocess.CalledProcessError as e:
        print(f"Error creating Kubernetes namespace: {e.output.decode()}")


def install_chart(chart_location: str, release_name: str, namespace: str) -> None:
    # Install the Helm chart
    helm_path = os.path.join(chart_location, "testengine_helm-0.1.0.tgz ")
    install_command = f"helm install {release_name} {helm_path} -n {namespace}"
    try:
        print(f"Installing Helm chart {release_name}...")
        subprocess.run(install_command, shell=True, check=True)
        print(f"Helm chart {release_name} installed successfully.")
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Error installing Helm chart: {e.output.decode()}")


def deploy_chart(release_name:str, chart_directory: str , namespace: str) -> None:
    package_chart(chart_directory, chart_directory)
    install_chart(chart_directory, release_name, namespace)


def deploy_primary(chart_directory: str, release_name: str, namespace: str) -> None:
    deploy_chart(chart_directory, "Primary", release_name, namespace)


def deploy_worker(chart_directory: str, release_name: str, namespace: str) -> None:
    deploy_chart(chart_directory, "Worker", release_name, namespace)


if __name__ == '__main__':
    pass


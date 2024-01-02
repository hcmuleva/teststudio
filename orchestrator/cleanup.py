from kubernetes import client, config

# Load the Kubernetes configuration
config.load_kube_config()

# Step 1: Get a list of deployments with names of four characters
v1 = client.AppsV1Api()
deployments = v1.list_deployment_for_all_namespaces().items
deployments_output = [
    f"{deployment.metadata.namespace}/{deployment.metadata.name}"
    for deployment in deployments
    if len(deployment.metadata.name) == 4
]

# Step 2: Delete the deployments
for deployment in deployments_output:
    namespace, name = deployment.split("/")
    v1.delete_namespaced_deployment(name, namespace)

# Step 3: Get a list of namespaces with names of four characters
v1 = client.CoreV1Api()
namespaces = v1.list_namespace().items
namespaces_output = [
    namespace.metadata.name
    for namespace in namespaces
    if len(namespace.metadata.name) == 4
]

# Step 4: Delete the namespaces
for namespace in namespaces_output:
    v1.delete_namespace(namespace)

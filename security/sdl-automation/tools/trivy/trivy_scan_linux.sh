#!/bin/bash

# Image to be scanned
IMAGE_TO_SCAN="$1"

# File where the results should be stored
OUTPUT_FILE="./trivy_results.txt"

# Pull the latest Trivy container image
docker pull aquasec/trivy

# Use Trivy container to scan the desired image
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v $PWD:/results aquasec/trivy image --output /results/$OUTPUT_FILE $IMAGE_TO_SCAN

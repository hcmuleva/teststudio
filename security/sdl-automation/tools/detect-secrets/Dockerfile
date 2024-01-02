# Use a base Python image
FROM python:3.9-slim

# Set up a working directory
WORKDIR /app

# Install git and detect-secrets
RUN apt-get update && \
    apt-get install -y git && \
    pip install detect-secrets
RUN mkdir -p /app/output && chmod 777 /app/output
# Define the entry point as the detect-secrets command
ENTRYPOINT ["detect-secrets"]

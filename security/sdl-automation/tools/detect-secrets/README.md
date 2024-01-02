# Detect-Secrets Docker-Compose Setup

This guide explains how to run the `detect-secrets` tool inside a Docker container using `docker-compose`. By leveraging an `.env` file, you can configure directories for scanning and output.

## Prerequisites

- Docker
- Docker-Compose

## Setup

1. Clone this repository or navigate to the directory containing the `docker-compose.yml` and `Dockerfile`.

2. Create an `.env` file in the same directory as your `docker-compose.yml`. This file will contain your configurations. Add the following lines to it:

    ```env
    SCAN_DIR=/path/to/your/source/directory
    OUTPUT_DIR=/path/to/your/output/directory
    ```

   Replace the placeholders with the actual paths you want to use.

3. Ensure that your Docker daemon is running and navigate to the directory containing the `docker-compose.yml` file.

4. Run the following command to start the scan:

    ```bash
    docker-compose up
    ```

   Docker-Compose will automatically pick up the `.env` file and substitute the variables in the `docker-compose.yml` accordingly.

5. After the scan is complete, you can find the results in the output directory specified in the `.env` file.

## Troubleshooting

- If you get a "file not found" error, ensure that the paths in your `.env` file are correct.
- If no output is written, make sure that the output directory is writable by the Docker container.

## Contribute

Feel free to contribute to this setup by submitting pull requests or issues for any bugs you might encounter.


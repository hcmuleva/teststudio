import subprocess

def rununittest(request):
    json_obj = request.json  
    print("Request object", json_obj)
    unit_test_directory=json_obj['data']['projectlocation']
    #unit_test_directory = r"C:\\personal\\HPH\software\\teststudio\\frameworks\\unitfunctional"

    # Change the working directory for the subsequent commands
    subprocess.run(["cd", unit_test_directory], shell=True, check=True)

    # Run the mvn command in the specified working directory
    unit_test_command = "mvn clean install"
    #subprocess.run(unit_test_command, shell=True, check=True, cwd=unit_test_directory)
    result = subprocess.run(unit_test_command, shell=True, check=True, cwd=unit_test_directory, capture_output=True, text=True)

        # Print the output to the console
    print("\n\n Harish_result",result.stdout)

    # Process the output to get the total number of tests, passed, failed, and skipped
    total_tests = result.stdout.count("Tests run:")
    tests_passed = result.stdout.count("Passed:")
    tests_failed = result.stdout.count("Failed:")
    tests_skipped = result.stdout.count("Skipped:")


    return {"status": "success", "message": "Unit test passed"}

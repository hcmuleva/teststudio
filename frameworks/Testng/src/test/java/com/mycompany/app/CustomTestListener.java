package com.mycompany.app;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.util.Map;
import java.util.HashMap;
public class CustomTestListener implements ITestListener {
    public void updateResults(int total, int pass, int fail, int skip) {
        System.out.println("Pushing results to database" + "Total=>"+total+ "pass=>" + pass + fail + skip);
        try {
            // Specify the URL for the POST request
            String url = "http://localhost:1337/api/results";
            ObjectMapper objectMapper = new ObjectMapper();

            // Create the URL object
            URL apiUrl = new URL(url);

            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) apiUrl.openConnection();

            // Set the request method to POST
            connection.setRequestMethod("POST");

            // Enable input/output streams
            connection.setDoOutput(true);

            // Set request headers (if needed)
            connection.setRequestProperty("Content-Type", "application/json");
            //connection.setRequestProperty("Authorization", "Bearer YOUR_ACCESS_TOKEN");
            // Create an ObjectWriter
            ObjectWriter objectWriter = objectMapper.writerWithDefaultPrettyPrinter();
            Map<String, Integer> jsonMap = new HashMap<>();
            jsonMap.put("total", total);
            jsonMap.put("pass", pass);
            jsonMap.put("fail", fail);
            jsonMap.put("skip", skip);
            Map<String, Map> jsonObj = new HashMap<>();
            jsonObj.put("data", jsonMap);
            try {
                // Convert the JSON object to a JSON string
                String jsonString = objectMapper.writeValueAsString(jsonObj);

                // Print the JSON string (for debugging)
                System.out.println("JSON String: \n" + jsonString);

                // Write the JSON string to the output stream
                try (OutputStream outputStream = connection.getOutputStream()) {
                    byte[] input = jsonString.getBytes(StandardCharsets.UTF_8);
                    outputStream.write(input, 0, input.length);
                }

                // Get the HTTP response code
                int responseCode = connection.getResponseCode();
                System.out.println("\nResponse Code: " + responseCode);

                // Read and print the response from the server
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                    String line;
                    StringBuilder response = new StringBuilder();
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    System.out.println("Response: " + response.toString());
                }

            } catch (IOException e) {
                // Handle exceptions related to JSON processing or writing to the output stream
                e.printStackTrace();
            } finally {
                // Disconnect the connection
                connection.disconnect();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
       
        
            
    }
    // Override onFinish method
    @Override
    public void onFinish(ITestContext context) {
        int passCount = context.getPassedTests().size();
        int failCount = context.getFailedTests().size();
        int skipCount = context.getSkippedTests().size();
        int total=passCount+failCount+skipCount;
        
        System.out.println("HPH -> Total Passed Tests: " + passCount +
                "\nTotal Failed Tests: " + failCount +
                "\nTotal Skipped Tests: " + skipCount);
        updateResults(total, passCount, failCount, skipCount);
        System.out.println("Updated result ");
        // Call a method to push results into the database
        pushResultsToDatabase("JUnit Test Suite", passCount, failCount, skipCount);
    }

    private void pushResultsToDatabase(String testName, int passCount, int failCount, int skipCount) {
        // Implement database connection and insertion logic here
        // Use JDBC, JPA, Hibernate, or any other database access mechanism
        // Insert values into your database table
    }
}

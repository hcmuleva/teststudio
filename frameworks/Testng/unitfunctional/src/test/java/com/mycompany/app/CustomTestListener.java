package com.mycompany.app;

import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class CustomTestListener implements ITestListener {
    // Override onFinish method
    @Override
    public void onFinish(ITestContext context) {
        int passCount = context.getPassedTests().size();
        int failCount = context.getFailedTests().size();
        int skipCount = context.getSkippedTests().size();
        System.out.println("Harish Total Passed Tests: " + passCount+ "\nTotal Failed Tests: " + failCount + "\nTotal Skipped Tests: " + skipCount);
        // Call a method to push results into the database
        pushResultsToDatabase(context.getName(), passCount, failCount, skipCount);
    }

    private void pushResultsToDatabase(String testName, int passCount, int failCount, int skipCount) {
        // Implement database connection and insertion logic here
        // Use JDBC, JPA, Hibernate, or any other database access mechanism
        // Insert values into your database table
    }
}

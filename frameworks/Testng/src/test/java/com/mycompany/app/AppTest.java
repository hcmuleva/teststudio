package com.mycompany.app;

import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.TestListenerAdapter;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;
import org.testng.TestNG;

import java.util.List;

public class AppTest {
    // Need to Test Calculator add sub function
    @Test
    public void testAdd() {
        Calculator calculator = new Calculator();
        int result = calculator.add(10, 20);
        Assert.assertEquals(result, 30);
    }

    @Test
    public void testSub() {
        Calculator calculator = new Calculator();
        int result = calculator.sub(20, 10);
        Assert.assertEquals(result, 10);
    }

    @Test
    public void testDiv() {
        Calculator calculator = new Calculator();
        int result = calculator.div(20, 10);
        Assert.assertEquals(result, 2);
    }

    @Test
    public void testMul() {
        Calculator calculator = new Calculator();
        int result = calculator.mul(10, 20);
        Assert.assertEquals(result, 200);
    }
}

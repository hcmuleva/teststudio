package com.mycompany.app;


import java.util.List;

import org.junit.Test;
import static org.junit.Assert.assertEquals;


public class AppTest {
    // Need to Test Calculator add sub function
    @Test
    public void testAdd() {
        Calculator calculator = new Calculator();
        int result = calculator.add(10, 20);
        assertEquals(result, 30);
    }

    @Test
    public void testSub() {
        Calculator calculator = new Calculator();
        int result = calculator.sub(20, 10);
        assertEquals(result, 10);
    }

    @Test
    public void testDiv() {
        Calculator calculator = new Calculator();
        int result = calculator.div(20, 10);
        assertEquals(result, 2);
    }

    @Test
    public void testMul() {
        Calculator calculator = new Calculator();
        int result = calculator.mul(10, 20);
        assertEquals(result, 200);
    }
}

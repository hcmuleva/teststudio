package com.example;
import com.intuit.karate.junit5.Karate;

class TestRunner {
    @Karate.Test
    Karate testRunner() {
        
        return Karate.run().tags().relativeTo(getClass());
        
    	//String tags = System.getenv("KARATE_TAGS");
        //if (tags == null) {
          //  tags = "all";
        //}
        //return Karate.run().tags(tags).relativeTo(getClass());
    }

    
}

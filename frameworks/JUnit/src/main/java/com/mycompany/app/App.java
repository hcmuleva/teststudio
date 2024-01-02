package com.mycompany.app;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class App {

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", new MyHandler());
        server.setExecutor(null); // creates a default executor
        server.start();

    }

    static class MyHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange t) throws IOException {
            // Get the request body
            String requestBody = getRequestBody(t);
            if(requestBody == null || requestBody.isEmpty()){
                requestBody = "No Request Body";
            }
            // Process the request body or do anything you need
            System.out.println("Request Body: " + requestBody);
            
            String response = "<h1>Hello World!!!! I just Dockerized a Maven Project</h1>";
            t.sendResponseHeaders(200, response.length());
            OutputStream os = t.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }

        private String getRequestBody(HttpExchange t) throws IOException {
            // Read the request body from the input stream
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(t.getRequestBody()))) {
                StringBuilder requestBody = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    requestBody.append(line);
                }
                return requestBody.toString();
            }catch(Exception e){
                System.out.println("Exception: " + e.getMessage());
                return "";
            }
        }
    }
}

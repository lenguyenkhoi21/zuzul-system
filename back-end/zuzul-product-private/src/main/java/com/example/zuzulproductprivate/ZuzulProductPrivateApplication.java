package com.example.zuzulproductprivate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulProductPrivateApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulProductPrivateApplication.class, args);
    }

}

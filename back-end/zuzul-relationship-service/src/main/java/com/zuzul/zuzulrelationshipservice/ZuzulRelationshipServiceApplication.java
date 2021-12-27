package com.zuzul.zuzulrelationshipservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulRelationshipServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulRelationshipServiceApplication.class, args);
    }

}

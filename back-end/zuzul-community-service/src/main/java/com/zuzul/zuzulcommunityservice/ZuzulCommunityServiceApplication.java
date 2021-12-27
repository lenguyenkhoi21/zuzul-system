package com.zuzul.zuzulcommunityservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulCommunityServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulCommunityServiceApplication.class, args);
    }

}

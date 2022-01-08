package com.zuzul.zuzulimageservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulImageServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulImageServiceApplication.class, args);
    }

}

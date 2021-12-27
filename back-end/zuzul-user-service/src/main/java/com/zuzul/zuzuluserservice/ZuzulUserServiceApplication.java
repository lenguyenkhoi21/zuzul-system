package com.zuzul.zuzuluserservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulUserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulUserServiceApplication.class, args);
    }

}

package com.zuzul.zuzulhistoryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulHistoryServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulHistoryServiceApplication.class, args);
    }

}

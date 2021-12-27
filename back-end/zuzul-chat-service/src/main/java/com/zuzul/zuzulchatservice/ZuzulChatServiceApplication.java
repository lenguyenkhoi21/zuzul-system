package com.zuzul.zuzulchatservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulChatServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulChatServiceApplication.class, args);
    }

}

package com.zuzul.zuzulproductpublic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulProductPublicApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulProductPublicApplication.class, args);
    }

}

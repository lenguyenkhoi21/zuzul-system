package com.zuzul.zuzulpublicapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulPublicApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulPublicApiApplication.class, args);
    }

}

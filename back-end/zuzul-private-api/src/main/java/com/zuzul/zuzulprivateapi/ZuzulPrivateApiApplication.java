package com.zuzul.zuzulprivateapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulPrivateApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulPrivateApiApplication.class, args);
    }

}

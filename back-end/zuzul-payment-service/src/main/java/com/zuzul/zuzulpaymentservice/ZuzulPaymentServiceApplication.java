package com.zuzul.zuzulpaymentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class ZuzulPaymentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulPaymentServiceApplication.class, args);
    }

}

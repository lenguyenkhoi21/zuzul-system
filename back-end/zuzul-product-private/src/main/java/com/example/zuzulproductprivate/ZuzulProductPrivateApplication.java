package com.example.zuzulproductprivate;

import com.example.zuzulproductprivate.common.adminclient.Keycloak;
import com.example.zuzulproductprivate.common.kafka.Kafka;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableEurekaClient
@SpringBootApplication
@EnableConfigurationProperties({Keycloak.class, Kafka.class})
public class ZuzulProductPrivateApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZuzulProductPrivateApplication.class, args);
    }
}

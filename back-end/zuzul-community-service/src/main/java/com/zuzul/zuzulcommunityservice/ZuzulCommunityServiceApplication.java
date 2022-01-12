package com.zuzul.zuzulcommunityservice;

import com.zuzul.zuzulcommunityservice.common.kafka.Kafka;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
@EnableConfigurationProperties(Kafka.class)
public class ZuzulCommunityServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulCommunityServiceApplication.class, args);
    }

}

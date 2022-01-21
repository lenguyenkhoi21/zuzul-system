package com.zuzul.zuzuluserservice;

import com.zuzul.zuzuluserservice.common.adminClient.Keycloak;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableEurekaClient
@SpringBootApplication
@EnableConfigurationProperties(Keycloak.class)
public class ZuzulUserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulUserServiceApplication.class, args);
    }

}

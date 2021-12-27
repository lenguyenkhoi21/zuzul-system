package com.zuzul.zuzuladminauthentication;

import com.zuzul.zuzuladminauthentication.common.adminclient.Keycloak;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableEurekaClient
@EnableConfigurationProperties(Keycloak.class)
@SpringBootApplication
public class ZuzulAdminAuthenticationApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulAdminAuthenticationApplication.class, args);
    }

}

package com.example.configmock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class ConfigMockApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigMockApplication.class, args);
    }

}

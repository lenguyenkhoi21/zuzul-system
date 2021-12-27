package com.zuzul.zuzulconfigserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@EnableConfigServer
@SpringBootApplication
public class ZuzulConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuzulConfigServerApplication.class, args);
    }

}

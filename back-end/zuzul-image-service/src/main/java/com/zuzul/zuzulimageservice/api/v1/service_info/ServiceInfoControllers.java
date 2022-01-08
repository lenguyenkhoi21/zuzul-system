package com.zuzul.zuzulimageservice.api.v1.service_info;

import com.zuzul.zuzulimageservice.common.ultis.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(Constant.rootPath)
public class ServiceInfoControllers {
    private static final Logger logger = LoggerFactory.getLogger(ServiceInfoControllers.class);

    @GetMapping("/service-info")
    public Mono<ServiceInfo> info() {
        return Mono.just(ServiceInfo.builder()
                                    .name("ZUZUL-IMAGE-SERVICE")
                                    .description("GET IMAGE")
                                    .version("V1")
                                    .build());
    }
}

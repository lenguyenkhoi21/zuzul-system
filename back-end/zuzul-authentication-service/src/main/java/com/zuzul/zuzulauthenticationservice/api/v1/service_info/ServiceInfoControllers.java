package com.zuzul.zuzulauthenticationservice.api.v1.service_info;

import com.zuzul.zuzulauthenticationservice.common.ultis.Constant;
import com.zuzul.zuzulauthenticationservice.common.usercontext.UserContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.rootPath)
public class ServiceInfoControllers {
    private final Logger logger = LoggerFactory.getLogger(ServiceInfoControllers.class);

    @GetMapping("/service-info")
    public ServiceInfo info() {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPath +
                "/service-info");

        return ServiceInfo.builder()
                          .name("AUTHENTICATION-SERVICE")
                          .description("VERIFY, IDENTIFY & REGISTRATION USER")
                          .version("V1")
                          .build();
    }
}

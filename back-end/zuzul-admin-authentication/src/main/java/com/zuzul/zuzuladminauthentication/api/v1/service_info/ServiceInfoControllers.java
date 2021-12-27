package com.zuzul.zuzuladminauthentication.api.v1.service_info;

import com.zuzul.zuzuladminauthentication.common.ultis.Constant;
import com.zuzul.zuzuladminauthentication.common.usercontext.UserContext;
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
                          .name("ADMIN-AUTHENTICATION")
                          .description("ADMIN LOGIN")
                          .version("V1")
                          .build();
    }
}

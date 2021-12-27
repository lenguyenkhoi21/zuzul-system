package com.zuzul.zuzulpaymentservice.api.v1.service_info;

import com.zuzul.zuzulpaymentservice.common.ultis.Constant;
import com.zuzul.zuzulpaymentservice.common.usercontext.UserContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping(Constant.rootPath)
public class ServiceInfoControllers {
    private final Logger logger = LoggerFactory.getLogger(ServiceInfoControllers.class);

    @RolesAllowed("TEST_ROLE")
    @GetMapping("/service-info")
    public ServiceInfo info() {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPath +
                "/service-info");

        return ServiceInfo.builder()
                          .name("PAYMENT-SERVICE")
                          .description("PAYMENT FOR USER")
                          .version("V1")
                          .build();
    }
}

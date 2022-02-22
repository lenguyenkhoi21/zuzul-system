package com.zuzul.zuzuluserservice.api.v1.service_info;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import com.zuzul.zuzuluserservice.common.usercontext.UserContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping(Constant.rootPathV1)
public class ServiceInfoControllers {
    //fixed
    private final Logger logger = LoggerFactory.getLogger(ServiceInfoControllers.class);

    @RolesAllowed("TEST_ROLE")
    @GetMapping("/service-info")
    public ServiceInfo info() {
        logger.info("CorrelationID - " +  UserContext.getCorrelationId());
        return ServiceInfo.builder()
                          .name("USER-SERVICE")
                          .description("MANAGE USER")
                          .version("V1")
                          .build();
    }

    @RolesAllowed("TEST_ROLE_2")
    @GetMapping("/service-infos")
    public ServiceInfo info2() {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPathV1 +
                "/service-info");

        return ServiceInfo.builder()
                          .name("RELATIONSHIP-PUBLIC-2")
                          .description("PUBLIC API FOR QUERY RELATIONSHIP-2")
                          .version("V1")
                          .build();
    }
}

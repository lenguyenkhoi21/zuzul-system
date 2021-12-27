package com.zuzul.zuzulcommunityservice.api.v1.service_info;


import com.zuzul.zuzulcommunityservice.common.ultis.Constant;
import com.zuzul.zuzulcommunityservice.common.usercontext.UserContext;
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
                          .name("COMMUNITY-SERVICE")
                          .description("COMMUNITY, REALTIME NOTIFY CATION, COMMENT, WRITE STATUS")
                          .version("V1")
                          .build();
    }
}

package com.example.zuzulproductprivate.api.v1.service_info;

import com.example.zuzulproductprivate.common.ultis.Constant;
import com.example.zuzulproductprivate.common.usercontext.UserContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

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
                          .name("PRODUCT-PRIVATE")
                          .description("CRUD PRODUCT")
                          .version("V1")
                          .build();
    }

    @RolesAllowed("TEST_ROLE")
    @PostMapping("/service-info")
    public ServiceInfo infoPost(@RequestBody ServiceInfo info) {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPath +
                "/service-info");

        return ServiceInfo.builder()
                          .name("PRODUCT-PRIVATE")
                          .description("CRUD PRODUCT")
                          .version("V1")
                          .build();
    }
}

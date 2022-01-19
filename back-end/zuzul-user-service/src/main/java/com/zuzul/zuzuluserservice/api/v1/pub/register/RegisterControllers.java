package com.zuzul.zuzuluserservice.api.v1.pub.register;

import com.zuzul.zuzuluserservice.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import com.zuzul.zuzuluserservice.common.usercontext.UserContext;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class RegisterControllers {
    private final RegisterServices services;
    private final Logger logger = LoggerFactory.getLogger(RegisterControllers.class);

    @PostMapping("/pub/register")
    public RegisterPOSTResponse register(@RequestBody POSTUserPayload payload) {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPathV1 +
                "/register");

        return services.register(payload);
    }
}

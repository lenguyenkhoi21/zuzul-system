package com.zuzul.zuzuluserservice.api.v1.pub.login;

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

@Deprecated
@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class LoginControllers {
    private final LoginServices services;
    private final Logger logger = LoggerFactory.getLogger(LoginControllers.class);

    @PostMapping("/pub/login")
    public LoginPOSTResponse login(@RequestBody POSTUserPayload payload) {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPathV1 +
                "/login");

        return services.login(payload);
    }
}

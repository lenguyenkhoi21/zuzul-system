package com.zuzul.zuzuluserservice.api.v2.user.login;

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
@RequestMapping(Constant.rootPathV2)
public class LoginV2Controllers {
    private final LoginV2Services services;
    private final Logger logger = LoggerFactory.getLogger(LoginV2Controllers.class);

    @PostMapping("/pub/login")
    public LoginV2POSTResponse login(@RequestBody POSTUserPayload payload) {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPathV2 +
                "/login");

        System.out.println(payload);
        return services.login(payload);
    }
}

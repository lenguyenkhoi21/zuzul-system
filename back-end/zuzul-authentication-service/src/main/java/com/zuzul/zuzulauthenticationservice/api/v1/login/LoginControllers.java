package com.zuzul.zuzulauthenticationservice.api.v1.login;

import com.zuzul.zuzulauthenticationservice.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzulauthenticationservice.common.ultis.Constant;
import com.zuzul.zuzulauthenticationservice.common.usercontext.UserContext;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPath)
public class LoginControllers {
    private final LoginServices services;
    private final Logger logger = LoggerFactory.getLogger(LoginControllers.class);

    @PostMapping("/login")
    public LoginPOSTResponse login(@RequestBody POSTUserPayload payload) {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPath +
                "/login");

        return services.login(payload);
    }
}

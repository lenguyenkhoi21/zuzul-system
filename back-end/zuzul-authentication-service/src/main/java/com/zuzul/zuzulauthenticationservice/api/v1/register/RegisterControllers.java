package com.zuzul.zuzulauthenticationservice.api.v1.register;

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
public class RegisterControllers {
    private final RegisterServices services;
    private final Logger logger = LoggerFactory.getLogger(RegisterControllers.class);

    @PostMapping("/register")
    public RegisterPOSTResponse register(@RequestBody POSTUserPayload payload) {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPath +
                "/register");

        return services.register(payload);
    }
}

package com.zuzul.zuzuladminauthentication.api.v1.login;

import com.zuzul.zuzuladminauthentication.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzuladminauthentication.common.ultis.Constant;
import com.zuzul.zuzuladminauthentication.common.usercontext.UserContext;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.rootPath)
@RequiredArgsConstructor
public class LoginControllers {
    private final LoginServices loginServices;
    private final Logger logger = LoggerFactory.getLogger(LoginControllers.class);

    @PostMapping("/login")
    private LoginPOSTResponse loginAdmin (@RequestBody POSTUserPayload payload) {
        logger.info("Correlation ID - "
                + UserContext.getCorrelationId()
                + " into path - "
                + Constant.rootPath + "/login");

        return loginServices.login(payload);
    }
}

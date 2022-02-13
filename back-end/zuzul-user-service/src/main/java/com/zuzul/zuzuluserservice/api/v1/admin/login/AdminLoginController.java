package com.zuzul.zuzuluserservice.api.v1.admin.login;

import com.zuzul.zuzuluserservice.api.v1.pub.login.LoginControllers;
import com.zuzul.zuzuluserservice.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import com.zuzul.zuzuluserservice.common.usercontext.UserContext;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(Constant.rootPathV1)
@RestController
@RequiredArgsConstructor
@Deprecated
public class AdminLoginController {
    private final LoginAdmin loginAdmin;
    private final Logger logger = LoggerFactory.getLogger(LoginControllers.class);

    @GetMapping("/admin/login")
    public POSTLoginAdminResponse login(@RequestBody POSTUserPayload payload) {
        logger.info("CorrelationID - " +
                UserContext.getCorrelationId() +
                " into path - " +
                Constant.rootPathV1 +
                "/admin/login");

        return loginAdmin.login(payload);
    }
}

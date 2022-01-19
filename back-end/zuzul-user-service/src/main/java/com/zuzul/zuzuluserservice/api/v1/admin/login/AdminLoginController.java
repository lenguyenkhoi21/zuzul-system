package com.zuzul.zuzuluserservice.api.v1.admin.login;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(Constant.rootPathV1)
public class AdminLoginController {

    @GetMapping("/admin/login")
    public String login() {
        return "Login";
    }
}

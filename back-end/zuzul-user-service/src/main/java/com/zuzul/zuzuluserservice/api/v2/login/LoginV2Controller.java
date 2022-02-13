package com.zuzul.zuzuluserservice.api.v2.login;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV2)
public class LoginV2Controller {
    private final LoginV2Service loginV2Service;

    @PostMapping("/admin/login")
    public AdminPOSTLoginV2ResponsePOST loginAdmin(@RequestBody AdminPOSTLoginV2PayloadPOST adminPOSTLoginV2PayloadPOST) {
        return loginV2Service.handleLogin(adminPOSTLoginV2PayloadPOST);
    }
}

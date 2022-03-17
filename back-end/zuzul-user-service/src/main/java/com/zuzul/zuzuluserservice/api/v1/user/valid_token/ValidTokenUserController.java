package com.zuzul.zuzuluserservice.api.v1.user.valid_token;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping(Constant.rootPathV1)
public class ValidTokenUserController {

    @RolesAllowed("USER")
    @GetMapping("/user/valid_token")
    public ResponseEntity<?> getValidToken () {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

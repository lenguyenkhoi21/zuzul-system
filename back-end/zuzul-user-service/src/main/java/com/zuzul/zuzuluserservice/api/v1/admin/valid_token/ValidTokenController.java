package com.zuzul.zuzuluserservice.api.v1.admin.valid_token;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping(Constant.rootPathV1)
public class ValidTokenController {

    @RolesAllowed("ADMIN")
    @GetMapping("/admin/valid_token")
    public ResponseEntity<?> validToken() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

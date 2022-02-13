package com.zuzul.zuzuluserservice.api.v1.pub.valid_token;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.rootPathV1)
public class ValidTokenControllers {

    @GetMapping("/pub/valid_token")
    public ResponseEntity<?> validToken() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package com.example.zuzulproductprivate.api.v1.pub;

import com.example.zuzulproductprivate.common.ultis.Constant;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.rootPathV1)
public class PublicController {

    @GetMapping("/pub")
    public String helloPub() {
        return "Hello From Private !";
    }
}

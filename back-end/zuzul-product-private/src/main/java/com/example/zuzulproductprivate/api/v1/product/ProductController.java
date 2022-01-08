package com.example.zuzulproductprivate.api.v1.product;

import com.example.zuzulproductprivate.api.v1.product.post_create_new.CreateNewService;
import com.example.zuzulproductprivate.api.v1.product.post_create_new.Payload;
import com.example.zuzulproductprivate.api.v1.product.post_create_new.Response;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;

@RestController
@RequestMapping(Constant.rootPath)
@RequiredArgsConstructor
public class ProductController {
    private final CreateNewService createNewService;

    @RolesAllowed("TEST_ROLE")
    @PostMapping("/product")
    public Response addNew(@RequestBody Payload payload,
                           @RequestParam("files") MultipartFile[] files,
                           Principal principal) {
        return createNewService.saveToDatabase(payload, principal);
    }
}

package com.example.zuzulproductprivate.api.v1.user.product;

import com.example.zuzulproductprivate.api.v1.user.product.post_create_new.CreateNewService;
import com.example.zuzulproductprivate.api.v1.user.product.post_create_new.Payload;
import com.example.zuzulproductprivate.api.v1.user.product.post_create_new.Response;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping(Constant.rootPathv1)
@RequiredArgsConstructor
public class ProductController {
    private final CreateNewService createNewService;

    @RolesAllowed("TEST_ROLE")
    @PostMapping(value = "/user/product",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response addNew(@ModelAttribute @Valid Payload payload,
                           @RequestPart("prd_image1") MultipartFile prd_image1,
                           @RequestPart("prd_image2") MultipartFile prd_image2,
                           @RequestPart("prd_image3") MultipartFile prd_image3,
                           Principal principal) throws IOException {
        return createNewService.saveToDatabase(payload,
                prd_image1,
                prd_image2,
                prd_image3,
                principal);
    }
}

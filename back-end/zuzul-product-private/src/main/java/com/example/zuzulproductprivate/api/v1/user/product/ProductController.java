package com.example.zuzulproductprivate.api.v1.user.product;

import com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying.ChangeNumberInStorage;
import com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying.Details;
import com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying.PUTChangeNumberInStoragePayload;
import com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying.PUTNumberInStorageResponse;
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
import java.util.List;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class ProductController {
    private final CreateNewService createNewService;
    private final ChangeNumberInStorage changeNumberInStorage;

    @RolesAllowed("USER")
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

    @RolesAllowed("USER")
    @PutMapping("/user/product/{userId}/changeNumberInStorage")
    public String changeNumberInStorage (@PathVariable("userId") String userId,
                                                             @RequestBody List<Details> payload,
                                                             Principal principal) {
        try {
            return changeNumberInStorage.changeNumberInStorage(userId, payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return "FAIL";
    }
}

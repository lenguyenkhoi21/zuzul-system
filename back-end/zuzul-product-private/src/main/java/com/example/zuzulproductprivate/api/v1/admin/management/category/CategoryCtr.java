package com.example.zuzulproductprivate.api.v1.admin.management.category;

import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.CreateCategoryService;
import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.Payload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.Response;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.DisableCategory;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.PUTDisableCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.PUTDisableCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.UpdateCategoryService;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class CategoryCtr {
    private final CreateCategoryService createCategoryService;
    private final Logger logger = LoggerFactory.getLogger(CategoryCtr.class);
    private final UpdateCategoryService updateCategoryService;
    private final DisableCategory disableCategory;

    @RolesAllowed("TEST_ROLE")
    @PostMapping(value = "/admin/management/category",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response createCategory (@ModelAttribute Payload payload,
                                     @RequestPart("cat_image") MultipartFile catImage,
                                     Principal principal) throws IOException {
        try {
            return createCategoryService.createCategory(payload,catImage,principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return Response.builder().build();
    }

    @RolesAllowed("TEST_ROLE")
    @PutMapping(value = "/admin/management/category",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public PUTUpdateCategoryResponse updateCategory(@ModelAttribute PUTUpdateCategoryPayload payload,
                                                     @RequestPart("cat_image") MultipartFile categoryImage, Principal principal) {
        return updateCategoryService.updateCategory(payload, categoryImage, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @PutMapping(value = "/admin/management/category/disable",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public PUTDisableCategoryResponse disableCategory(@ModelAttribute PUTDisableCategoryPayload payload,
                                                      Principal principal) {
        return disableCategory.disableCategory(payload, principal);
    }
}

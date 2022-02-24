package com.example.zuzulproductprivate.api.v1.admin.management.category;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.CategoryModel;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.GETAllCategoryAdmin;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.GETAllCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GETCategoryByIDResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GetCategoryByID;
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
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class CategoryCtr {
    private final CreateCategoryService createCategoryService;
    private final Logger logger = LoggerFactory.getLogger(CategoryCtr.class);
    private final UpdateCategoryService updateCategoryService;
    private final DisableCategory disableCategory;
    private final GETAllCategoryAdmin getAllCategory;
    private final GetCategoryByID getCategoryByID;

    @RolesAllowed("ADMIN")
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

    @RolesAllowed("ADMIN")
    @PutMapping(value = "/admin/management/category",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public PUTUpdateCategoryResponse updateCategory(@ModelAttribute PUTUpdateCategoryPayload payload,
                                                     @RequestPart("cat_image") MultipartFile categoryImage, Principal principal) throws IOException {
        try {
            return updateCategoryService.updateCategory(payload, categoryImage, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTUpdateCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }

    @RolesAllowed("ADMIN")
    @PutMapping(value = "/admin/management/category/disable",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public PUTDisableCategoryResponse disableCategory(@RequestBody PUTDisableCategoryPayload payload,
                                                      Principal principal) {
        try {
            return disableCategory.disableCategory(payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTDisableCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }

    @RolesAllowed("ADMIN")
    @GetMapping(value = "/admin/management/category/all/{userId}")
    public List<CategoryModel> getAllCategory (@PathVariable("userId") String userId, Principal principal) {
        try {
            return getAllCategory.getAllCategory(userId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    @RolesAllowed("ADMIN")
    @GetMapping(value = "/admin/management/category/{userId}/{categoryId}")
    public GETCategoryByIDResponse getCategoryByID (@PathVariable("userId") String userId,
                                                    @PathVariable("categoryId") String categoryId,
                                                    Principal principal) {
        try {
            return getCategoryByID.getCategoryByID(userId, categoryId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return GETCategoryByIDResponse.builder().build();
    }
}

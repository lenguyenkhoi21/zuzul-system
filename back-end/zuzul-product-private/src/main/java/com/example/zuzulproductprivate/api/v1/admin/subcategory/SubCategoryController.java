package com.example.zuzulproductprivate.api.v1.admin.subcategory;

import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.subcategory.post_create_sub.CreateSubCategoryService;
import com.example.zuzulproductprivate.api.v1.admin.subcategory.post_create_sub.POSTSubCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.subcategory.post_create_sub.POSTSubCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.subcategory.put_disable_sub.DisableSubCategory;
import com.example.zuzulproductprivate.api.v1.admin.subcategory.put_disable_sub.PUTDisableSubCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.subcategory.put_disable_sub.PUTDisableSubCategoryResponse;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class SubCategoryController {

    private final CreateSubCategoryService categoryService;
    private final DisableSubCategory disableSubCategory;

    @PostMapping("/admin/management/sub")
    private POSTSubCategoryResponse createSubCategory (@ModelAttribute @Valid POSTSubCategoryPayload payload,
                                                       Principal principal) {
        return categoryService.createSubCategory(payload, principal);
    }

    @PutMapping("/admin/management/sub/disable")
    private PUTDisableSubCategoryResponse disableSubCategory (@ModelAttribute PUTDisableSubCategoryPayload payload,
                                                              Principal principal) {
        return disableSubCategory.disableSubCategory(payload, principal);
    }
}

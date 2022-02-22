package com.example.zuzulproductprivate.api.v1.admin.management.sub;

import com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_cat.GETSubCategoryByCate;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_cat.SubCategoryModel;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.post_create_sub.*;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_disable_sub.*;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_update_sub.PUTUpdateSubCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_update_sub.PUTUpdateSubCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_update_sub.UpdateSubCategory;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class SubCategoryController {

    private final CreateSubCategoryService categoryService;
    private final DisableSubCategory disableSubCategory;
    private final UpdateSubCategory updateSubCategory;
    private final GETSubCategoryByCate getSubCategoryByCate;

    @RolesAllowed("ADMIN")
    @PostMapping("/admin/management/sub")
    public POSTSubCategoryResponse createSubCategory (@RequestBody POSTSubCategoryPayload payload,
                                                       Principal principal) {
        try {
            return categoryService.createSubCategory(payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return POSTSubCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }

    @RolesAllowed("ADMIN")
    @PutMapping("/admin/management/sub/disable")
    public PUTDisableSubCategoryResponse disableSubCategory (@RequestBody PUTDisableSubCategoryPayload payload,
                                                             Principal principal) {
        try {
            return disableSubCategory.disableSubCategory(payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTDisableSubCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }

    @RolesAllowed("ADMIN")
    @PutMapping("/admin/management/sub")
    public PUTUpdateSubCategoryResponse updateSubCategory (@RequestBody PUTUpdateSubCategoryPayload payload,
                                                           Principal principal) {
        try {
            return updateSubCategory.updateSubCategory(payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTUpdateSubCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }

    @RolesAllowed("ADMIN")
    @GetMapping("/admin/management/sub/all/{userId}/{categoryId}")
    public List<SubCategoryModel> getSubCategoryByCategory(@PathVariable("userId") String userId,
                                                            @PathVariable("categoryId") String categoryId,
                                                            Principal principal) {
        try {
            return getSubCategoryByCate.getSubCategoryByCate(principal, userId, categoryId);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }
}

package com.example.zuzulproductprivate.api.v1.admin.subcategory.post_create_sub;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import com.example.zuzulproductprivate.common.ultis.FunctionalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class CreateSubCategoryService {
    private final SubCategoryRepository subCategoryRepository;

    public POSTSubCategoryResponse createSubCategory (POSTSubCategoryPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {

            String subCategoryId = FunctionalUtil.generateSubCategoryUUID();

            SubCategory subCategory = SubCategory
                    .builder()
                    .subCategoryId(subCategoryId)
                    .subCategoryName(payload.getSubCategoryName())
                    .subCategoryDescription(payload.getSubCategoryDescription())
                    .status("AVAILABLE")
                    .build();

            subCategoryRepository.save(subCategory);

            return POSTSubCategoryResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }

        return POSTSubCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

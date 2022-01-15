package com.example.zuzulproductprivate.api.v1.admin.subcategory.put_update_sub;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UpdateSubCategory {
    private final SubCategoryRepository subCategoryRepository;

    public PUTUpdateSubCategoryResponse updateSubCategory (PUTUpdateSubCateogoryPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            SubCategory subCategory = subCategoryRepository.findSubCategoryBySubCategoryId(payload.getSubCategoryId());

            SubCategory updatedSubCategory = SubCategory
                    .builder()
                    .id(subCategory.getId())
                    .subCategoryName(payload.getSubCategoryName())
                    .subCategoryId(subCategory.getSubCategoryId())
                    .subCategoryDescription(payload.getSubCategoryDescription())
                    .status(payload.getStatus())
                    .build();

            subCategoryRepository.save(updatedSubCategory);

            return PUTUpdateSubCategoryResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }

        return PUTUpdateSubCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

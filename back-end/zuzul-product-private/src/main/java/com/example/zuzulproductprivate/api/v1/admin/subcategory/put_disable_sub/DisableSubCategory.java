package com.example.zuzulproductprivate.api.v1.admin.subcategory.put_disable_sub;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class DisableSubCategory {
    private final SubCategoryRepository subCategoryRepository;

    public PUTDisableSubCategoryResponse disableSubCategory (PUTDisableSubCategoryPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            SubCategory subCategory = subCategoryRepository.findSubCategoryBySubCategoryId(payload.getSubCategoryId());

            subCategory.setStatus(payload.getStatus());

            subCategoryRepository.save(subCategory);

            return PUTDisableSubCategoryResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return PUTDisableSubCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

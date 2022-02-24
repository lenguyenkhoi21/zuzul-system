package com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_id;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Principal;

@Service
@RequiredArgsConstructor
public class GetSubCategoryById {
    private final SubCategoryRepository subCategoryRepository;

    public GETSubCategoryIdResponse getSubCategoryId (String userId, String subCategoryId, Principal principal) {
        if (principal.getName().equals(userId)) {
            SubCategory subCategory = subCategoryRepository.findSubCategoryBySubCategoryId(subCategoryId);

            return GETSubCategoryIdResponse
                    .builder()
                    .subCategoryName(subCategory.getSubCategoryName())
                    .subCategoryId(subCategoryId)
                    .build();
        }

        return GETSubCategoryIdResponse
                .builder()
                .build();
    }
}

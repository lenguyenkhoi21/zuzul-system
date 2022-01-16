package com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class DisableCategory {
    private final CategoryRepository categoryRepository;

    public PUTDisableCategoryResponse disableCategory (PUTDisableCategoryPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            Category category = categoryRepository.findCategoryByCategoryId(payload.getCategoryId());

            category.setStatus(payload.getStatus());

            categoryRepository.save(category);

            return PUTDisableCategoryResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return PUTDisableCategoryResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

package com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class GetCategoryByID {
    private final CategoryRepository categoryRepository;

    public GETCategoryByIDResponse getCategoryByID (String userId, String categoryId, Principal principal) {
        if (principal.getName().equals(userId)) {
            Category category = categoryRepository.findCategoryByCategoryId(categoryId);

            return GETCategoryByIDResponse
                    .builder()
                    .categoryId(categoryId)
                    .categoryImage(category.getCategoryImage())
                    .categoryName(category.getCategoryName())
                    .build();
        }
        return GETCategoryByIDResponse
                .builder()
                .build();
    }
}

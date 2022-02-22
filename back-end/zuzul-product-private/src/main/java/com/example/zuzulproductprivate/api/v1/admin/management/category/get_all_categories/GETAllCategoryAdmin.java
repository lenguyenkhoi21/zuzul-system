package com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GETAllCategoryAdmin {
    private final CategoryRepository categoryRepository;

    public List<CategoryModel> getAllCategory (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<Category> categories = categoryRepository.findAllByStatus("AVAILABLE");

            List<CategoryModel> categoryModels = new ArrayList<>();

            categories.forEach(category-> categoryModels.add(CategoryModel
                    .builder()
                    .categoryId(category.getCategoryId())
                    .categoryName(category.getCategoryName())
                    .categoryImage(category.getCategoryImage())
                    .build()));

            return categoryModels;
        }
        return null;

    }
}

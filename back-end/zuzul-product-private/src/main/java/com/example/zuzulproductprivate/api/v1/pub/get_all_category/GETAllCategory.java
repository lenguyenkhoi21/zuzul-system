package com.example.zuzulproductprivate.api.v1.pub.get_all_category;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GETAllCategory {
    private final CategoryRepository categoryRepository;

    public GETAllCategoryResponse getAllCategory () {
        List<Category> categories = categoryRepository.findAllByStatus("AVAILABLE");

        List<CategoryModel> categoryModels = new ArrayList<>();

        categories.forEach(category -> {
            categoryModels.add(CategoryModel
                    .builder()
                    .categoryId(category.getCategoryId())
                    .categoryName(category.getCategoryName())
                    .categoryDescription(category.getCategoryDescription())
                    .categoryImage(category.getCategoryImage())
                    .subCategoryList(category.getSubCategoryList())
                    .status(category.getStatus())
                    .build());
        });

        return GETAllCategoryResponse
                .builder()
                .categoryList(categoryModels)
                .status("SUCCESS")
                .build();
    }
}

package com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_cat;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GETSubCategoryByCate {
    private final SubCategoryRepository subCategoryRepository;

    public List<SubCategoryModel> getSubCategoryByCate (Principal principal,
                                                        String userId,
                                                        String categoryId) {
        if (principal.getName().equals(userId)) {
            List<SubCategory> subCategories = subCategoryRepository.getAllByCategoryId(categoryId);

            List<SubCategoryModel> subCategoryModelList = new ArrayList<>();

            subCategories.forEach(subCategory ->
                    subCategoryModelList.add(SubCategoryModel
                            .builder()
                            .subCategoryId(subCategory.getSubCategoryId())
                            .subCategoryName(subCategory.getSubCategoryName())
                            .subCategoryDescription(subCategory.getSubCategoryDescription())
                            .build())
                    );

            return subCategoryModelList;
        }
        return new ArrayList<>();
    }
}

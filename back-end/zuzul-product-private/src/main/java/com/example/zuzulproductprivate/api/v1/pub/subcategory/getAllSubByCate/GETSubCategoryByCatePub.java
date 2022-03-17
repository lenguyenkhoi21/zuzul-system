package com.example.zuzulproductprivate.api.v1.pub.subcategory.getAllSubByCate;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GETSubCategoryByCatePub {
    private final SubCategoryRepository subCategoryRepository;

    public List<SubCategoryModel> getSubCategoryByCate (String categoryId) {

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
}

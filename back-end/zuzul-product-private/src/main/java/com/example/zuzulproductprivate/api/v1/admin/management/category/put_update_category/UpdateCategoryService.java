package com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.ultis.FunctionalUtil;
import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UpdateCategoryService {
    private final CategoryRepository categoryRepository;
    private final ImageUtils imageUtils;

    public PUTUpdateCategoryResponse updateCategory (PUTUpdateCategoryPayload payload, MultipartFile categoryImage, Principal principal){
        if (principal.getName().equals(payload.getUserId())) {
            Category category = categoryRepository.findCategoryByCategoryId(payload.getCategoryId());

            Category updatedCategory = Category
                    .builder()
                    .id(category.getId())
                    .categoryId(category.getCategoryId())
                    .categoryName(payload.getCategoryName())
                    .categoryDescription(payload.getCategoryDescription())
                    .categoryImage(category.getCategoryImage()) //Tạm thời để như này vì AWS bị limited
                    .subCategoryList(payload.getSubCategoryList())
                    .status(payload.getStatus())
                    .build();

            categoryRepository.save(updatedCategory);

//            boolean isSuccessCategoryImage = categoryImageName != null &&
//                    imageUtils.uploadToCategoryAWSS3(categoryId, categoryImageName,
//                            categoryImage.getBytes());

            return PUTUpdateCategoryResponse
                    .builder()
                    .status("SUCCESS")
                    .categoryImage(false)
                    .build();
        }
        return PUTUpdateCategoryResponse
                .builder()
                .status("FAIL")
                .categoryImage(false)
                .build();
    }
}

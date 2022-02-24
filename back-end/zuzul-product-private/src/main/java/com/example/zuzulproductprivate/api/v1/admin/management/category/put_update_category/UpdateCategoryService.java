package com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.ultis.FunctionalUtil;
import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UpdateCategoryService {
    private final CategoryRepository categoryRepository;
    private final ImageUtils imageUtils;

    public PUTUpdateCategoryResponse updateCategory (PUTUpdateCategoryPayload payload, MultipartFile categoryImage, Principal principal) throws IOException {
        if (principal.getName().equals(payload.getUserId())) {
            Category category = categoryRepository.findCategoryByCategoryId(payload.getCategoryId());

            String categoryImageName = FunctionalUtil.renameFile(Objects.requireNonNull(categoryImage.getOriginalFilename()));

            Category updatedCategory = Category
                    .builder()
                    .id(category.getId())
                    .categoryId(category.getCategoryId())
                    .categoryName(payload.getCategoryName())
                    .categoryDescription(category.getCategoryDescription())
                    .categoryImage(category.getCategoryImage()) //Tạm thời để như này vì AWS bị limited
                    .status(category.getStatus())
                    .build();

            categoryRepository.save(updatedCategory);

            boolean isSuccessCategoryImage = categoryImageName != null &&
                    imageUtils.uploadToCategoryAWSS3(category.getCategoryId(), categoryImageName,
                            categoryImage.getBytes());

            return PUTUpdateCategoryResponse
                    .builder()
                    .status("SUCCESS")
                    .categoryImage(isSuccessCategoryImage)
                    .build();
        }
        return PUTUpdateCategoryResponse
                .builder()
                .status("FAIL")
                .categoryImage(false)
                .build();
    }
}

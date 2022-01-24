package com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.ultis.FunctionalUtil;
import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Objects;

//@Service
@Component
@RequiredArgsConstructor
public class CreateCategoryService {
    private final CategoryRepository categoryRepository;
    private final ImageUtils imageUtils;
    private final Logger logger = LoggerFactory.getLogger(CreateCategoryService.class);

    public Response createCategory (
            Payload payload, MultipartFile categoryImage,
            Principal principal) throws IOException {

            if (principal.getName().equals(payload.getUserId())) {
                String categoryImageName = FunctionalUtil
                        .renameCategoryFile(Objects.requireNonNull(categoryImage.getOriginalFilename()));

                String categoryId = FunctionalUtil.generateCategoryUUID();

                Category category = Category
                        .builder()
                        .categoryId(categoryId)
                        .categoryName(payload.getCategoryName())
                        .categoryImage(categoryImageName)
                        .categoryDescription(payload.getCategoryDescription())
                        .status("AVAILABLE")
                        .build();

                categoryRepository.save(category);

                boolean isSuccessCategoryImage = categoryImageName != null &&
                        imageUtils.uploadToCategoryAWSS3(categoryId, categoryImageName,
                                categoryImage.getBytes());

                return  Response
                        .builder()
                        .status("SUCCESS")
                        .categoryImage(isSuccessCategoryImage)
                        .build();
            }

        return Response
                .builder()
                .status("FAIL")
                .categoryImage(false)
                .build();
    }
}

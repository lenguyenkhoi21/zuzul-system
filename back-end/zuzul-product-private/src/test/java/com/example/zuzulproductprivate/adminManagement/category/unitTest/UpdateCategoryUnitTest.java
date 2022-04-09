package com.example.zuzulproductprivate.adminManagement.category.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GETCategoryByIDResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GetCategoryByID;
import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.Payload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.Response;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.UpdateCategoryService;
import com.example.zuzulproductprivate.common.aws.AWS;
import com.example.zuzulproductprivate.common.aws.AWSS3;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@SpringBootTest
public class UpdateCategoryUnitTest {

    UpdateCategoryService updateCategoryService;
    CategoryRepository categoryRepository;
    ImageUtils imageUtils;
    AWS aws;
    AWSS3 s3;

    @BeforeEach
    void setup() {
        categoryRepository = Mockito.spy(CategoryRepository.class);
        aws = Mockito.spy(AWS.class);
        s3 = new AWSS3(aws);
        imageUtils = Mockito.mock(ImageUtils.class);

        updateCategoryService = new UpdateCategoryService(categoryRepository,imageUtils);
    }

    @Test
    void updateCateSUCCESS() throws Exception{
        Category cate = new Category("1","1","a","a.png","aa","AVAILABLE");
        PUTUpdateCategoryPayload payload = new PUTUpdateCategoryPayload("1","u1","aa");

        MultipartFile categoryImage = Mockito.spy(MultipartFile.class);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn("a.png").when(categoryImage).getOriginalFilename();
        Mockito.doReturn(cate).when(categoryRepository).findCategoryByCategoryId("1");
        Mockito.doReturn(true).when(imageUtils).uploadToCategoryAWSS3(Mockito.anyString(), Mockito.anyString(), Mockito.any());
        PUTUpdateCategoryResponse response = updateCategoryService.updateCategory(payload, categoryImage, principal);
        Assertions.assertEquals(response.getStatus(), "SUCCESS");
        Assertions.assertTrue(response.isCategoryImage());
    }
    @Test
    void updateCateFAIL() throws Exception{
        PUTUpdateCategoryPayload payload = new PUTUpdateCategoryPayload("1","u1","aa");

        MultipartFile categoryImage = Mockito.spy(MultipartFile.class);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u2").when(principal).getName();
        PUTUpdateCategoryResponse response = updateCategoryService.updateCategory(payload, categoryImage, principal);
        Assertions.assertEquals(response.getStatus(), "FAIL");
        Assertions.assertFalse(response.isCategoryImage());
    }
}

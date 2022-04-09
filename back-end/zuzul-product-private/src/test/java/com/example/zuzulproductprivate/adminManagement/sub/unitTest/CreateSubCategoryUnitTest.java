package com.example.zuzulproductprivate.adminManagement.sub.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.CreateCategoryService;
import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.Payload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category.Response;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.post_create_sub.CreateSubCategoryService;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.post_create_sub.POSTSubCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.post_create_sub.POSTSubCategoryResponse;
import com.example.zuzulproductprivate.common.aws.AWS;
import com.example.zuzulproductprivate.common.aws.AWSS3;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@SpringBootTest
public class CreateSubCategoryUnitTest {

    CreateSubCategoryService createSubCategoryService;
    SubCategoryRepository subCategoryRepository;

    @BeforeEach
    void setup() {
        subCategoryRepository = Mockito.spy(SubCategoryRepository.class);
        createSubCategoryService = new CreateSubCategoryService(subCategoryRepository);
    }

    @Test
    void createSubCategorySuccess() throws Exception {
        SubCategory cate = Mockito.mock(SubCategory.class);
        POSTSubCategoryPayload payload = new POSTSubCategoryPayload("u1","a","test","c1");

        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(cate).when(subCategoryRepository).save(Mockito.any());
        POSTSubCategoryResponse response = createSubCategoryService.createSubCategory(payload,principal);
        Assertions.assertEquals(response.getStatus(), "SUCCESS");
    }

}

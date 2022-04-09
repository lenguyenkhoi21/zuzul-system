package com.example.zuzulproductprivate.adminManagement.sub.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.UpdateCategoryService;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_update_sub.PUTUpdateSubCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_update_sub.PUTUpdateSubCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_update_sub.UpdateSubCategory;
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
public class UpdateSubCategoryUnitTest {

    UpdateSubCategory updateSubCategory;
    SubCategoryRepository subCategoryRepository;

    @BeforeEach
    void setup() {
        subCategoryRepository = Mockito.spy(SubCategoryRepository.class);
        updateSubCategory = new UpdateSubCategory(subCategoryRepository);
    }

    @Test
    void updateSubCateSUCCESS() throws Exception{
        SubCategory cate = new SubCategory("1","1","a","a","c1","AVAILABLE");
        PUTUpdateSubCategoryPayload payload = new PUTUpdateSubCategoryPayload("1","u1","aa");

        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(cate).when(subCategoryRepository).findSubCategoryBySubCategoryId("1");
        PUTUpdateSubCategoryResponse response = updateSubCategory.updateSubCategory(payload,principal);
        Assertions.assertEquals(response.getStatus(), "SUCCESS");
    }
}

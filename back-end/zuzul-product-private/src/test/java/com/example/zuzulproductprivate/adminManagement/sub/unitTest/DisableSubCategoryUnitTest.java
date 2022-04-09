package com.example.zuzulproductprivate.adminManagement.sub.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.DisableCategory;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.PUTDisableCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.PUTDisableCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_disable_sub.DisableSubCategory;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_disable_sub.PUTDisableSubCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.put_disable_sub.PUTDisableSubCategoryResponse;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;

@SpringBootTest
public class DisableSubCategoryUnitTest {

    DisableSubCategory disableSubCategory;
    SubCategoryRepository subCategoryRepository;

    @BeforeEach
    void setup() {
        subCategoryRepository = Mockito.spy(SubCategoryRepository.class);
        disableSubCategory = new DisableSubCategory(subCategoryRepository);
    }

    @Test
    void disableSubCateSUCCESS(){
        SubCategory cate = new SubCategory("1","1","a","a","c1","AVAILABLE");
        PUTDisableSubCategoryPayload payload = new PUTDisableSubCategoryPayload("u1","1");
        Principal principal = Mockito.spy(Principal.class);

        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(cate).when(subCategoryRepository).findSubCategoryBySubCategoryId("1");

        PUTDisableSubCategoryResponse response = disableSubCategory.disableSubCategory(payload,principal);
        Assertions.assertEquals(response.getStatus(), "SUCCESS");
    }

}

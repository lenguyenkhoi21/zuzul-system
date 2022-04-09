package com.example.zuzulproductprivate.adminManagement.category.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GETCategoryByIDResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GetCategoryByID;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.DisableCategory;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.PUTDisableCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category.PUTDisableCategoryResponse;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;

@SpringBootTest
public class DisableCategoryUnitTest {

    DisableCategory disCategory;
    CategoryRepository categoryRepository;

    @BeforeEach
    void setup() {
        categoryRepository = Mockito.spy(CategoryRepository.class);
        disCategory = new DisableCategory(categoryRepository);
    }

    @Test
    void disableCateSUCCESS(){
        Category cate = new Category("1","1","a","a.png","aa","AVAILABLE");
        PUTDisableCategoryPayload payload = new PUTDisableCategoryPayload("1","u1");
        Principal principal = Mockito.spy(Principal.class);

        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(cate).when(categoryRepository).findCategoryByCategoryId("1");

        PUTDisableCategoryResponse response = disCategory.disableCategory(payload,principal);
        Assertions.assertEquals(response.getStatus(), "SUCCESS");
    }
    @Test
    void disableCateFAIL(){
        Category cate = new Category("1","1","a","a.png","aa","AVAILABLE");
        PUTDisableCategoryPayload payload = new PUTDisableCategoryPayload("1","u1");
        Principal principal = Mockito.spy(Principal.class);

        Mockito.doReturn("u2").when(principal).getName();
        Mockito.doReturn(cate).when(categoryRepository).findCategoryByCategoryId("2");

        PUTDisableCategoryResponse response = disCategory.disableCategory(payload,principal);
        Assertions.assertEquals(response.getStatus(), "FAIL");
    }
}

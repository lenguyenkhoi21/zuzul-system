package com.example.zuzulproductprivate.adminManagement.category.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.CategoryModel;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.GETAllCategoryAdmin;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GETCategoryByIDResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GetCategoryByID;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class GetCategoryByIDUnitTest {

    GetCategoryByID getCategoryByID;
    CategoryRepository categoryRepository;

    @BeforeEach
    void setup() {
        categoryRepository = Mockito.spy(CategoryRepository.class);
        getCategoryByID = new GetCategoryByID(categoryRepository);
    }

    @Test
    void getCateID(){
        Category cate = new Category("1","1","a","a.png","aa","ok");

        Mockito.doReturn(cate).when(categoryRepository).findCategoryByCategoryId("1");
        String userId = "userId1";
        Principal principal = Mockito.spy(Principal.class);

        Mockito.doReturn(userId).when(principal).getName();

        GETCategoryByIDResponse result = getCategoryByID.getCategoryByID(userId,"1",principal);
        Assertions.assertEquals(result.getCategoryImage(), "a.png");
    }
}

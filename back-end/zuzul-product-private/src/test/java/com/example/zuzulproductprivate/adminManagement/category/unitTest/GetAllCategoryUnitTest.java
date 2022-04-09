package com.example.zuzulproductprivate.adminManagement.category.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.CategoryModel;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.GETAllCategoryAdmin;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.GETAllCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GetCategoryByID;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.util.ReflectionTestUtils;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootTest
public class GetAllCategoryUnitTest {

    GETAllCategoryAdmin getAllCategoryAdmin;
    CategoryRepository categoryRepository;

    @BeforeEach
    void setup() {
        categoryRepository = Mockito.spy(CategoryRepository.class);
        getAllCategoryAdmin = new GETAllCategoryAdmin(categoryRepository);
    }

    @Test
    void getCategories(){
        List<Category> cates = new ArrayList<>();
        cates.add(new Category("1","1","cat1","1.png","aa","ok"));
        cates.add(new Category("2","2","cat2","2.png","aa","ok"));
        cates.add(new Category("3","3","cat3","3.png","aa","ok"));

        Mockito.doReturn(cates).when(categoryRepository).findAllByStatus("AVAILABLE");
        String userId = "userId1";
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn(userId).when(principal).getName();

        List<CategoryModel> result = getAllCategoryAdmin.getAllCategory(userId, principal);
        Assertions.assertEquals(result.size(), 3);
        Assertions.assertEquals(result.get(0).getCategoryId(), "1");
        Assertions.assertEquals(result.get(1).getCategoryId(), "2");
        Assertions.assertEquals(result.get(2).getCategoryId(), "3");

    }
}

package com.example.zuzulproductprivate.pub.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.GETAllCategoryAdmin;
import com.example.zuzulproductprivate.api.v1.pub.category.CategoryModel;
import com.example.zuzulproductprivate.api.v1.pub.category.GETAllCategory;
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
public class GetAllCategoryUserUnitTest {

    GETAllCategory getAllCategory;
    CategoryRepository categoryRepository;

    @BeforeEach
    void setup() {
        categoryRepository = Mockito.spy(CategoryRepository.class);
        getAllCategory = new GETAllCategory(categoryRepository);
    }

    @Test
    void getAllCategories(){
        List<Category> cates = new ArrayList<>();
        cates.add(new Category("1","1","cat1","1.png","aa","ok"));
        cates.add(new Category("2","2","cat2","2.png","aa","ok"));
        cates.add(new Category("3","3","cat3","3.png","aa","ok"));

        Mockito.doReturn(cates).when(categoryRepository).findAllByStatus("AVAILABLE");
        String userId = "userId1";
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn(userId).when(principal).getName();

        List<CategoryModel> result = getAllCategory.getAllCategory();
        Assertions.assertEquals(result.size(), 3);
        Assertions.assertEquals(result.get(0).getCategoryId(), "1");
        Assertions.assertEquals(result.get(1).getCategoryId(), "2");
        Assertions.assertEquals(result.get(2).getCategoryId(), "3");

    }
}

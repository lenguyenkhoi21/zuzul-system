package com.example.zuzulproductprivate.pub.unitTest;

import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category.CategoryModels;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category.GetAllProductByCategory;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class GetAllProductsByCategoryUserUnitTest {

    GetAllProductByCategory getAllByCategory;
    CategoryRepository categoryRepository;
    ProductRepository productRepository;
    SubCategoryRepository subCategoryRepository;

    @BeforeEach
    void setup() {
        categoryRepository = Mockito.spy(CategoryRepository.class);
        productRepository =Mockito.spy(ProductRepository.class);
        subCategoryRepository = Mockito.spy(SubCategoryRepository.class);
        getAllByCategory = new GetAllProductByCategory(productRepository,subCategoryRepository,categoryRepository);
    }

    @Test
    void getAllCategories(){
        List<Category> cates = new ArrayList<>();
        cates.add(new Category("1","1","cat1","1.png","aa","ok"));

        Mockito.doReturn(cates).when(categoryRepository).findAllByStatus("AVAILABLE");
        String userId = "userId1";
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn(userId).when(principal).getName();

        List<CategoryModels> result = getAllByCategory.getProductsByCategory("1");
        Assertions.assertEquals(result.size(), 1);
        Assertions.assertEquals(result.get(0).getCategoryId(), "1");


    }
}

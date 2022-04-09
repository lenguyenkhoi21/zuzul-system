package com.example.zuzulproductprivate.pub.unitTest;

import com.example.zuzulproductprivate.api.v1.pub.category.CategoryModel;
import com.example.zuzulproductprivate.api.v1.pub.category.GETAllCategory;
import com.example.zuzulproductprivate.api.v1.pub.product.get_product_by_id.GETProductByIDResponse;
import com.example.zuzulproductprivate.api.v1.pub.product.get_product_by_id.GetProductByID;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class GetProductByIDUserUnitTest {

    GetProductByID getProductByID;
    CategoryRepository categoryRepository;
    ProductRepository productRepository;

    @BeforeEach
    void setup() {
        productRepository = Mockito.spy(ProductRepository.class);
        categoryRepository = Mockito.spy(CategoryRepository.class);
        getProductByID = new GetProductByID(productRepository,categoryRepository);
    }

    @Test
    void getAllProducts(){
        Product product = Mockito.mock(Product.class);
        Category category = Mockito.mock(Category.class);
        Mockito.doReturn(product).when(productRepository).findByPrdId("1");
        Mockito.doReturn(category).when(categoryRepository).findCategoryByCategoryId(Mockito.any());
        GETProductByIDResponse result = getProductByID.getProductById("1");
        Assertions.assertNotNull(result);
    }
}

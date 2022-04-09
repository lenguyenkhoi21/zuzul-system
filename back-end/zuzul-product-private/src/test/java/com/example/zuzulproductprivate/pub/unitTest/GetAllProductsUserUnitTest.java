package com.example.zuzulproductprivate.pub.unitTest;

import com.example.zuzulproductprivate.api.v1.pub.category.CategoryModel;
import com.example.zuzulproductprivate.api.v1.pub.category.GETAllCategory;
import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product.GetAllProduct;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import org.apache.kafka.clients.MockClient;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class GetAllProductsUserUnitTest {

    GetAllProduct getAllProduct;
    ProductRepository productRepository;

    @BeforeEach
    void setup() {
        productRepository = Mockito.spy(ProductRepository.class);
        getAllProduct = new GetAllProduct(productRepository);
    }

    @Test
    void getAllProducts(){
        List<Product> prds = new ArrayList<>();
        Product prd = Mockito.mock(Product.class);
        prds.add(prd);
        Mockito.doReturn(prds).when(productRepository).findAllByPrdStatus("AVAILABLE");
        String userId = "userId1";
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn(userId).when(principal).getName();

        List<ProductsModel> result = getAllProduct.getAllProducts();
        Assertions.assertEquals(result.size(), 1);


    }
}

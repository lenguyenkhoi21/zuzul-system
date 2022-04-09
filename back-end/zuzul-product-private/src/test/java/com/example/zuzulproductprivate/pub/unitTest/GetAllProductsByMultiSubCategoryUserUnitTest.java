package com.example.zuzulproductprivate.pub.unitTest;

import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category.CategoryModels;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category.GetAllProductByCategory;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_sub.GetAllProductBySub;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class GetAllProductsByMultiSubCategoryUserUnitTest {

    GetAllProductBySub getAllBySub;
    ProductRepository productRepository;
    MongoTemplate mongoTemplate;
    @BeforeEach
    void setup() {
        productRepository =Mockito.spy(ProductRepository.class);
        mongoTemplate = Mockito.mock(MongoTemplate.class);
        getAllBySub = new GetAllProductBySub(productRepository,mongoTemplate);
    }

    @Test
    void getAllByMutiSubs(){
        List<String> subCateIds = new ArrayList<>();
        subCateIds.add("a");
        List<Product> products = new ArrayList<>();
        products.add(Mockito.mock(Product.class));
        Mockito.doReturn(products).when(mongoTemplate).find(Mockito.any(Query.class), Mockito.eq(Product.class));
        List<ProductsModel> result = getAllBySub.getAllProductByMultipleSub(subCateIds,"1");
        Assertions.assertEquals(result.size(),1);
    }
}

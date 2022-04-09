package com.example.zuzulproductprivate.userProduct.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.UpdateCategoryService;
import com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying.ChangeNumberInStorage;
import com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying.Details;
import com.example.zuzulproductprivate.common.aws.AWS;
import com.example.zuzulproductprivate.common.aws.AWSS3;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class ChangeNumberInStorageUnitTest {

    ProductRepository productRepository;
    ChangeNumberInStorage change;
    @BeforeEach
    void setup() {
        productRepository = Mockito.spy(ProductRepository.class);
        change = new ChangeNumberInStorage(productRepository);
    }

    @Test
    void updateCateSUCCESS() throws Exception{
        List<Product> productList = new ArrayList<>();
        Product product = Mockito.mock(Product.class);
        List<Details> payload = new ArrayList<>();
        payload.add(new Details("1", 1));
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d").when(principal).getName();
        Mockito.doReturn(product).when(productRepository).findByPrdId("1");
        productList.add(product);
        String response = change.changeNumberInStorage("1",payload,principal);
        Assertions.assertEquals(response, "SUCCESS");
    }
}

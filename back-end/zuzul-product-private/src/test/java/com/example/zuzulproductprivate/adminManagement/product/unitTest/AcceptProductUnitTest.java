package com.example.zuzulproductprivate.adminManagement.product.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryPayload;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.PUTUpdateCategoryResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category.UpdateCategoryService;
import com.example.zuzulproductprivate.api.v1.admin.management.product.accept_product.AcceptProduct;
import com.example.zuzulproductprivate.api.v1.admin.management.product.accept_product.PUTAcceptProductResponse;
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

@SpringBootTest
public class AcceptProductUnitTest {

    ProductRepository productRepository;
    AcceptProduct acceptProduct;

    @BeforeEach
    void setup() {
        productRepository = Mockito.spy(ProductRepository.class);
        acceptProduct = new AcceptProduct(productRepository);
    }

    @Test
    void AcceptProductSUCCESS() throws Exception{
        Product product = Mockito.mock(Product.class);
        Principal principal = Mockito.spy(Principal.class);
        String type = "accept";
        String productId = product.getPrdId();
        Mockito.doReturn("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d").when(principal).getName();
        Mockito.doReturn(product).when(productRepository).findByPrdId(productId);
        PUTAcceptProductResponse response = acceptProduct.acceptProduct(type,productId,principal);
        Assertions.assertEquals(response.getStatus(), "SUCCESS");
    }
    @Test
    void RejectProductSUCCESS() throws Exception{
        Product product = Mockito.mock(Product.class);
        Principal principal = Mockito.spy(Principal.class);
        String type = "REJECTED";
        String productId = product.getPrdId();
        Mockito.doReturn("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d").when(principal).getName();
        Mockito.doReturn(product).when(productRepository).findByPrdId(productId);
        PUTAcceptProductResponse response = acceptProduct.acceptProduct(type,productId,principal);
        Assertions.assertEquals(response.getStatus(), "SUCCESS");
    }
}

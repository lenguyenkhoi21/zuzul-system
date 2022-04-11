package com.example.zuzulproductprivate.api.v1.user.product.disable_product;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class DisableProduct {
    private final ProductRepository productRepository;

    public PUTDisableProductResponse disableProduct (String userId, String productId, Principal principal) {
        if (principal.getName().equals(userId)) {
            Product product = productRepository.findByPrdId(productId);

            product.setPrdStatus("DISABLE");

            productRepository.save(product);

            return PUTDisableProductResponse.builder().status("SUCCESS").build();
        }
        return PUTDisableProductResponse.builder().status("FAIL").build();
    }
}

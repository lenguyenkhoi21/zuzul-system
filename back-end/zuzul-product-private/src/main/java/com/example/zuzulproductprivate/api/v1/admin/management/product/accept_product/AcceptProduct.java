package com.example.zuzulproductprivate.api.v1.admin.management.product.accept_product;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class AcceptProduct {
    private final ProductRepository productRepository;

    public PUTAcceptProductResponse acceptProduct (String type, String productId, Principal principal) {
        if (principal.getName().equals("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d")) {
            Product product = productRepository.findByPrdId(productId);
            if (type.equals("accept")) {
                product.setPrdStatus("AVAILABLE");

                productRepository.save(product);
            }
            else {
                product.setPrdStatus("REJECTED");

                productRepository.save(product);
            }
            return PUTAcceptProductResponse.builder().status("SUCCESS").build();
        }
        return PUTAcceptProductResponse.builder().status("FAIL").build();
    }
}

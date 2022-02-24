package com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllRegisteredProduct {
    private final ProductRepository productRepository;

    public List<ProductsModel> getAllRegisteredProduct (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<Product> products = productRepository.findAllByPrdStatus("WAITING_FOR_ACCEPT");

            List<ProductsModel> productsModels = new ArrayList<>();

            products.forEach(product -> {
                productsModels.add(ProductsModel
                        .builder()
                        .build());
            });

            return productsModels;
        }
        return new ArrayList<>();
    }
}

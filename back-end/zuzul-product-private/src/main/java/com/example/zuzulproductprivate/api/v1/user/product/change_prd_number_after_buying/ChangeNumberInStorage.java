package com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChangeNumberInStorage {
    private final ProductRepository productRepository;

    public String changeNumberInStorage (String userId, List<Details> payload, Principal principal) {
        if (principal.getName().equals(userId)|| principal.getName().equals("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d")) {
            List<Product> products = new ArrayList<>();

            List<Details> details = payload;

            try {
                details.forEach(detail -> {
                    products.add(productRepository.findByPrdId(detail.getProductId()));
                });

                for (int i = 0; i < products.size(); i++) {

                    products.get(i).setPrdNumberInStorage(products.get(i).getPrdNumberInStorage() - payload.get(i).getCount());
                    products.get(i).setPrdSale(payload.get(i).getCount());

                    productRepository.save(products.get(i));
                }
                return "SUCCESS";
            }
            catch (Exception exception) {
                exception.printStackTrace();
            }
        }
        return "FAIL";
    }
}

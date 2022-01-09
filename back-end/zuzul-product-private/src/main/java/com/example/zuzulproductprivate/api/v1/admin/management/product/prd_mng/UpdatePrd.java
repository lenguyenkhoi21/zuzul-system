package com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng;

import com.example.zuzulproductprivate.common.model.mongodb.ProductModel;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdatePrd {
    private final ProductRepository productRepository;

    public Response updateProduct(Payload payload) {
        ProductModel productAccept = productRepository.findByPrdId(payload.getPrdId());
        productAccept.setPrdStatus("AVAILABLE");
        productRepository.save(productAccept);
        return Response.builder()
                       .status("Success")
                       .build();
    }
}

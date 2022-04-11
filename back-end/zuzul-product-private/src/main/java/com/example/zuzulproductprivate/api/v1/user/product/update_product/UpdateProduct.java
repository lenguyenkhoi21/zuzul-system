package com.example.zuzulproductprivate.api.v1.user.product.update_product;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UpdateProduct {
    private final ProductRepository productRepository;

    public PUTUpdateProductResponse updateProduct (PUTUpdateProductPayload payload, MultipartFile image_1, MultipartFile image_2, MultipartFile image_3, Principal principal) {
        if (principal.getName().equals(payload.getPrdUserId())) {
            Product product = productRepository.findByPrdId(payload.getPrdId());

            product.setPrdName(payload.getPrdName());
            product.setPrdCateId(payload.getPrdCateId());
            product.setPrdSubId(payload.getPrdSubId());
            product.setPrdPriceOrigin(payload.getPrdPriceOrigin());
            product.setPrdOrigin(payload.getPrdOrigin());
            product.setPrdDateManufacture(payload.getPrdDateManufacture());
            product.setPrdMonthWarranty(payload.getPrdMonthWarranty());
            product.setPrdDateExpiry(payload.getPrdDateExpiry());
            product.setPrdShortDes(payload.getPrdShortDes());
            product.setPrdLongDes(payload.getPrdLongDes());
            product.setPrdSale(payload.getPrdSale());
            product.setPrdNumberInStorage(payload.getPrdNumberInStorage());
            product.setDiscount(payload.getDiscount());
            product.setPrdDateCreate(payload.getPrdDateCreate());

            productRepository.save(product);

            return PUTUpdateProductResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return PUTUpdateProductResponse.builder().status("FAIL").build();
    }
}

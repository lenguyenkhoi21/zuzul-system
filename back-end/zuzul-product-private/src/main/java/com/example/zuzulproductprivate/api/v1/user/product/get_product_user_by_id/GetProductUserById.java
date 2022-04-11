package com.example.zuzulproductprivate.api.v1.user.product.get_product_user_by_id;

import com.example.zuzulproductprivate.api.v1.pub.product.get_product_by_id.GETProductByIDResponse;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class GetProductUserById {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public GETProductUserByIdResponse getProductById (String userId, String productId, Principal principal) {
        if (principal.getName().equals(userId)) {
            Product product = productRepository.findByPrdId(productId);

            return GETProductUserByIdResponse
                    .builder()
                    .prdId(product.getPrdId())
                    .prdUserId(product.getPrdUserId())
                    .prdName(product.getPrdName())
                    .prdCateId(product.getPrdCateId())
                    .prdSubId(product.getPrdSubId())
                    .prdPriceOrigin(product.getPrdPriceOrigin())
                    .prdOrigin(product.getPrdOrigin())
                    .prdCateName(categoryRepository
                            .findCategoryByCategoryId(
                                    product
                                            .getPrdCateId())
                            .getCategoryName())
                    .prdDateManufacture(product.getPrdDateManufacture())
                    .prdShortDes(product.getPrdShortDes())
                    .prdLongDes(product.getPrdLongDes())
                    .prdSale(product.getPrdSale())
                    .prdImages(product.getPrdImages())
                    .prdReact(product.getPrdReact())
                    //.prdStatus(product.getPrdStatus())
                    .prdDateCreate(product.getPrdDateCreate())
                    //.prdDateExpiry(product.getPrdDateExpiry())
                    .prdMonthWarranty(product.getPrdMonthWarranty())
                    .prdNumberInStorage(product.getPrdNumberInStorage())
                    .discount(product.getDiscount())
                    //.currentImage(product.getCurrentImage())
                    .build();
        }
        return GETProductUserByIdResponse.builder().build();
    }
}

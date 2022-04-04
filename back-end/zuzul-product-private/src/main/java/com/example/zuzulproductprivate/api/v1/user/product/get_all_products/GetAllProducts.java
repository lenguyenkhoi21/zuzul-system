package com.example.zuzulproductprivate.api.v1.user.product.get_all_products;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllProducts {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public List<ProductsModel> getAllProductsforUser (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<Product> products = productRepository.findAllByPrdUserId(userId);

            List<ProductsModel> productsModels = new ArrayList<>();

            products.forEach(product -> {
                productsModels.add(
                        ProductsModel
                                .builder()
                                .categoryName(categoryRepository.findCategoryByCategoryId(product.getPrdCateId()).getCategoryName())
                                .numberInStorage(product.getPrdNumberInStorage())
                                .originPrice(product.getPrdPriceOrigin())
                                .productId(product.getPrdId())
                                .productName(product.getPrdName())
                                .sales(product.getPrdSale())
                                .subCategoryName(subCategoryRepository.findSubCategoryBySubCategoryId(product.getPrdSubId()).getSubCategoryName())
                                .build()
                );
            });

            return productsModels;
        }
        return new ArrayList<>();
    }
}

package com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category;

import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllProductByCategory {
    private final ProductRepository productRepository;
    private final SubCategoryRepository subCategoryRepository;

    public GETAllProductByCategoryResponse getProductsByCategory (String categoryId) {
        List<Product> products = productRepository.findAllByPrdCateIdAndPrdStatus(categoryId, "AVAILABLE");
        List<SubCategory> subCategories = subCategoryRepository.getAllByCategoryIdAndStatus(categoryId, "AVAILABLE");

        List<ProductsModel> productsModels = new ArrayList<>();
        List<String> subCategoryIds = new ArrayList<>();

        products.forEach(product -> productsModels.add(
                ProductsModel
                        .builder()
                        .prdCateId(product.getPrdCateId())
                        .prdId(product.getPrdId())
                        .currentImage(product.getCurrentImage())
                        .prdName(product.getPrdName())
                        .prdNumberInStorage(product.getPrdNumberInStorage())
                        .prdPriceOrigin(product.getPrdPriceOrigin())
                        .prdReact(product.getPrdReact())
                        .prdSale(product.getPrdSale())
                        .prdSubId(product.getPrdSubId())
                        .prdUserId(product.getPrdUserId())
                        .build()
        ));

        subCategories.forEach(subCategory -> subCategoryIds.add(subCategory.getCategoryId()));

        return GETAllProductByCategoryResponse
                .builder()
                .productsModels(productsModels)
                .subCategoryId(subCategoryIds)
                .build();
    }
}

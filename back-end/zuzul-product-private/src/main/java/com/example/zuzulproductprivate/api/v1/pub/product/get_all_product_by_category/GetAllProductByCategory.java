package com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category;

import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
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
    private final CategoryRepository categoryRepository;

    public GETAllProductByCategoryResponse getProductsByCategory (String categoryId) {
        List<Product> products = productRepository.findAllByPrdCateIdAndPrdStatus(categoryId, "AVAILABLE");
        List<SubCategory> subCategories = subCategoryRepository.getAllByCategoryIdAndStatus(categoryId, "AVAILABLE");
        List<Category> categories = categoryRepository.findAllByStatus("AVAILABLE");

        List<ProductsModel> productsModels = new ArrayList<>();
        List<SubCategoryModels> subCategoryModels = new ArrayList<>();
        List<CategoryModels> categoryModels = new ArrayList<>();

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
                        .prdShortDes(product.getPrdShortDes())
                        .build()
        ));

        subCategories.forEach(subCategory -> subCategoryModels.add(SubCategoryModels
                .builder()
                .subCategoryId(subCategory.getSubCategoryId())
                .subCategoryName(subCategory.getSubCategoryName())
                .build()));

        categories.forEach(category -> categoryModels.add(CategoryModels
                .builder()
                .categoryId(category.getCategoryId())
                .categoryName(category.getCategoryName())
                .build()));

        return GETAllProductByCategoryResponse
                .builder()
                .productsModels(productsModels)
                .subCategoryModels(subCategoryModels)
                .categoryModels(categoryModels)
                .build();
    }
}

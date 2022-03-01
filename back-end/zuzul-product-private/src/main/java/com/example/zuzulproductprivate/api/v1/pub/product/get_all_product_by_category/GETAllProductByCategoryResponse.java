package com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category;

import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETAllProductByCategoryResponse {
    private List<ProductsModel> productsModels;
    private List<SubCategoryModels> subCategoryModels;
    private List<CategoryModels> categoryModels;
}

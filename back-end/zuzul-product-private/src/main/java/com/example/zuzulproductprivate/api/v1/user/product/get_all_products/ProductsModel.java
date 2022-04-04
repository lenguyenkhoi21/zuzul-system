package com.example.zuzulproductprivate.api.v1.user.product.get_all_products;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductsModel {
    private String productId;
    private String productName;
    private String categoryName;
    private String subCategoryName;
    private int originPrice;
    private int numberInStorage;
    private float sales;
}

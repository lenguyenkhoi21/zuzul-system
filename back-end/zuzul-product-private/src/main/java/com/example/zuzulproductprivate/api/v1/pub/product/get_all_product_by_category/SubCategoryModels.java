package com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryModels {
    private String subCategoryId;
    private String subCategoryName;
}

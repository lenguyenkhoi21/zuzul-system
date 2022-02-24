package com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductsModel {
    private String userId;
    private String userShopName;
    private int count;
    private String categoryName;
    private String subCategoryName;
    private Date prdDateCreate;
}

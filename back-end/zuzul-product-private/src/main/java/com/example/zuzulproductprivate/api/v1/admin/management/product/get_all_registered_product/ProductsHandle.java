package com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductsHandle {
    List<String> userShopNames;
}

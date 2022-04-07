package com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsModel {
    private String prdName;
    private int prdPriceOrigin;
    private int discount;
}

package com.zuzul.zuzuluserservice.api.v1.user.cart.add_item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class POSTItemToCartPayload {
    private String productId;
    private String purchaserId;
    private String sellerId;
    private int count;
    private int originPrice;
    private int productSales;
}

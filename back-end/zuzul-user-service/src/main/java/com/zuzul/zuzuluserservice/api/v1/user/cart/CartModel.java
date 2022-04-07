package com.zuzul.zuzuluserservice.api.v1.user.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartModel {
    private String productId;
    private String purchaserId;
    private String productName;
    private String sellerId;
    private int count;
    private int originPrice;
    private int discount;
}

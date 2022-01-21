package com.zuzul.zuzuluserservice.api.v1.user.cart.add_item;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class POSTItemToCartResponse {
    private String status;
}

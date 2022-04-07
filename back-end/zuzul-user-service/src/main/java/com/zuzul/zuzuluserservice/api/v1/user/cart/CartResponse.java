package com.zuzul.zuzuluserservice.api.v1.user.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    @Builder.Default
    private List<CartModel> cartModelList = new ArrayList<>();
    @Builder.Default
    private boolean alert = false;
    private long totalMoney;
}

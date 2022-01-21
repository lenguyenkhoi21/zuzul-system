package com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items;

import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETAllItemsResponse {
    private List<CartModel> items;
    private String status;
}

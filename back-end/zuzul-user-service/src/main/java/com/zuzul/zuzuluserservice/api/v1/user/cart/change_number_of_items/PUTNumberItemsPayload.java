package com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTNumberItemsPayload {
    private String productId;
    private String purchaserId;
    private int count;
}

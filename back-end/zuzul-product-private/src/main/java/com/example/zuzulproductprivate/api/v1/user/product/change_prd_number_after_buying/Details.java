package com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Details {
    private String productId;
    private int count;
}

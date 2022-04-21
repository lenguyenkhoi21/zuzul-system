package com.example.zuzulproductprivate.api.v1.pub.product.filter_product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    private String userId;
    private String shopName;
}

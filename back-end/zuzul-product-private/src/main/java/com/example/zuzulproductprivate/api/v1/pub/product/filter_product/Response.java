package com.example.zuzulproductprivate.api.v1.pub.product.filter_product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private List<UserModel> userModels;
}

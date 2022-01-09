package com.example.zuzulproductprivate.api.v1.user.product.post_create_new;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private String status;
    private boolean image1;
    private boolean image2;
    private boolean image3;
}

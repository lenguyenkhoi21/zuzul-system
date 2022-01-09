package com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payload {
    private String prdId;
    private String prdUserId;
}

package com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTAcceptShopResponse {
    private String status;
}

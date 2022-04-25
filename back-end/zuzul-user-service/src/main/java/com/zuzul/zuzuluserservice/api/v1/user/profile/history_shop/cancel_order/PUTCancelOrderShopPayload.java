package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.cancel_order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTCancelOrderShopPayload {
    private String userId;
    private String id; //historyShop
    private String historyId;
    private String productName;
    private String filterStatus;
}

package com.zuzul.zuzuluserservice.api.v1.user.profile.history.cancel_order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTCancelOrderPayload {
    private String userId;
    private String id; //orderDetails
    private String historyId;
    private String productName;
}

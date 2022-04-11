package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.accept_order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PUTChangeStateOrderPayload {
    private String userId;
    private String status;
    private String filterStatus;
    private String historyId;
}

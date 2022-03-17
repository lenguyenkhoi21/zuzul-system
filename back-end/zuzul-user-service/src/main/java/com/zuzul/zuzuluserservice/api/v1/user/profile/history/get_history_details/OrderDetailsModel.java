package com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsModel {
    private String productName;
    private int count;
    private int originPrice;
    private int discount;
    private String sellerId;
    private String status;
}

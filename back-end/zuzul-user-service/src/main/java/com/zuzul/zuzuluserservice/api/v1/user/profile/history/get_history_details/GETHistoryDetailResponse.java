package com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GETHistoryDetailResponse {
    @Builder.Default
    private List<OrderDetailsModel> orderDetailsList = new ArrayList<>();
    private String userName;
    private String paymentType;
    private String address;
    private String phone;
}

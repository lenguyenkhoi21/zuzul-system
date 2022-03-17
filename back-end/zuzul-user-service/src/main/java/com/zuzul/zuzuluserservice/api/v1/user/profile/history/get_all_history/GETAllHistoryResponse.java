package com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GETAllHistoryResponse {
    private String userName;
    private String paymentType;
    private String address;
    private String phone;
    private List<HistoryModel> historyModels;
    private String status;
}

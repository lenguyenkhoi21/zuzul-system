package com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class POSTCreateHistoryPayload {
    private String userId;
    private int totalPrice;
    private String userName;
    private String paymentType;
    private String address;
    private String phone;
    private long dateCreated;
    private List<Details> detailsList;
}

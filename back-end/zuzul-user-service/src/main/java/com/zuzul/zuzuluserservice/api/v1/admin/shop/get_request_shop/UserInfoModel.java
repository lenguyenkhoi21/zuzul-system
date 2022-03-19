package com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoModel {
    private String userFullName;
    private String address;
    private long sendRequestDate;
    private String userId;
}

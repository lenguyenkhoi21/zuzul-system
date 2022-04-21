package com.zuzul.zuzuluserservice.api.v1.user.profile.shop.find_users_by_shopname;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {
    private String userId;
    private String userShopName;
}

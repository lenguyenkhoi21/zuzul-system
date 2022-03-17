package com.zuzul.zuzuluserservice.api.v2.user.login;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginV2POSTResponse {
    private String userID;
    private String access_token;
    private String role;
    private String name;
    private boolean isActivatedShop;
    private boolean isModifiedProfile;
}

package com.zuzul.zuzuluserservice.api.v1.admin.login;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Deprecated
public class POSTLoginAdminResponse {
    private String userID;
    private String access_token;
    private String role;
}

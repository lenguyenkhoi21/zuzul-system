package com.zuzul.zuzulauthenticationservice.api.v1.login;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginPOSTResponse {
    private String userID;
    private String access_token;
    private String role;
}

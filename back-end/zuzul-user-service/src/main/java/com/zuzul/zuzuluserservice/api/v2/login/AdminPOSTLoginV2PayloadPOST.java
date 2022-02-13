package com.zuzul.zuzuluserservice.api.v2.login;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminPOSTLoginV2PayloadPOST {
    private String username;
    private String password;
}

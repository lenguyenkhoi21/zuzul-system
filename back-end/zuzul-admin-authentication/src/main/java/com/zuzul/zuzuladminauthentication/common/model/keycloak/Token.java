package com.zuzul.zuzuladminauthentication.common.model.keycloak;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    @Builder.Default
    private String access_token = "";
    private String refresh_token;
    private int expires_in;
    private int refresh_expires_in;
    private String not_before_policy;
    private String session_state;
    private String scope;
}

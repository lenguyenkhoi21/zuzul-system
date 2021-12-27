package com.zuzul.zuzulauthenticationservice.common.model.keycloak;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Credential {
    @Builder.Default
    private String type = "password";
    private String value;
    @Builder.Default
    private boolean temporary = false;
}

package com.zuzul.zuzuladminauthentication.common.model.keycloak;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserKeyCloakPayload {
    private String username;
    private String email;
    @Builder.Default
    private boolean emailVerified = false;
    @Builder.Default
    private boolean enabled = true;
    @Builder.Default
    private List<Credential> credentials = new ArrayList<>();
}

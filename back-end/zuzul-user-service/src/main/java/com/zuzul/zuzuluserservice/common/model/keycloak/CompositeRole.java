package com.zuzul.zuzuluserservice.common.model.keycloak;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompositeRole {
    private String id;
    private String name;
    private boolean composite;
    private boolean clientRole;
    private String containerId;
}

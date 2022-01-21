package com.zuzul.zuzuluserservice.common.adminClient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ConfigurationProperties(prefix = "admin-client")
public class Keycloak {
    private String domain;
    private String admin;
    private String password;
    private String clientID;
    private String grant_type;
    private String realm;
}

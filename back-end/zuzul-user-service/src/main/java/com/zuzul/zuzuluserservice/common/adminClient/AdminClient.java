package com.zuzul.zuzuluserservice.common.adminClient;

import com.zuzul.zuzuluserservice.common.model.keycloak.Token;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
public class AdminClient {
    @Getter
    @Setter
    private Token token;
}

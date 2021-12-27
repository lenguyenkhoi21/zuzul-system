package com.zuzul.zuzulauthenticationservice.common.adminclient;

import com.zuzul.zuzulauthenticationservice.common.model.keycloak.Token;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
public class AdminClient {
    @Getter
    @Setter
    private Token token;
}

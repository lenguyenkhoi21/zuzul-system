package com.zuzul.zuzuladminauthentication.common.adminclient;

import com.zuzul.zuzuladminauthentication.common.model.keycloak.Token;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
public class AdminClient {
    @Getter
    @Setter
    private Token token;
}

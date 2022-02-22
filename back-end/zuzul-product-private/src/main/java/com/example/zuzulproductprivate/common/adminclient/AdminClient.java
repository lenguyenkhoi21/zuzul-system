package com.example.zuzulproductprivate.common.adminclient;

import com.example.zuzulproductprivate.common.model.keycloak.Token;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
public class AdminClient {
    @Getter
    @Setter
    private Token token;
}

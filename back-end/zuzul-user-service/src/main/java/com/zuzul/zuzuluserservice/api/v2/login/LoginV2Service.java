package com.zuzul.zuzuluserservice.api.v2.login;

import com.zuzul.zuzuluserservice.common.adminclient.AdminClient;
import com.zuzul.zuzuluserservice.common.adminclient.Keycloak;
import com.zuzul.zuzuluserservice.common.model.keycloak.Token;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class LoginV2Service {
    private final Keycloak keycloak;

    public AdminPOSTLoginV2ResponsePOST handleLogin(AdminPOSTLoginV2PayloadPOST payload) {
        // Create header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED.toString());
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());

        // Add header information admin client
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", keycloak.getGrant_type());
        requestBody.add("username", payload.getUsername());
        requestBody.add("password", payload.getPassword());
        requestBody.add("client_id", keycloak.getClientID());
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        // Url to get token from Keycloak
        String url = keycloak.getDomain() +
                "/auth/realms/" +
                keycloak.getRealm() +
                "/protocol/openid-connect/token";

        // Call API to Keycloak Server
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Token> restExchange = restTemplate.exchange(url,
                HttpMethod.POST,
                request,
                Token.class);

        Token token = restExchange.getBody();

        return AdminPOSTLoginV2ResponsePOST
                .builder()
                .userID("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d")
                .access_token(token.getAccess_token())
                .build();
    }
}

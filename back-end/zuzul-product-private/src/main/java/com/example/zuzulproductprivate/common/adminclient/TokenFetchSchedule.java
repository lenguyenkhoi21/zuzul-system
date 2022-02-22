package com.example.zuzulproductprivate.common.adminclient;

import com.example.zuzulproductprivate.common.model.keycloak.Token;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class TokenFetchSchedule {
    private final Keycloak keycloak;
    private final AdminClient adminClient;

    private static final Logger logger = LoggerFactory.getLogger(TokenFetchSchedule.class);
    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    private Token fetchTokenFetch() {
        // Create header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED.toString());
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());

        // Add header information admin client
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", keycloak.getGrant_type());
        requestBody.add("username", keycloak.getAdmin());
        requestBody.add("password", keycloak.getPassword());
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

        return restExchange.getBody();
    }

    @Scheduled(fixedDelay = Constant.fixedDelay)
    protected void scheduleFetchToken() {
        logger.info("Fetch token from keycloak :: Execution Time - {}", dateTimeFormatter.format(LocalDateTime.now()));
        adminClient.setToken(this.fetchTokenFetch());
    }

}

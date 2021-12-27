package com.zuzul.zuzulauthenticationservice.api.v1.register;

import com.zuzul.zuzulauthenticationservice.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzulauthenticationservice.common.adminclient.AdminClient;
import com.zuzul.zuzulauthenticationservice.common.adminclient.Keycloak;
import com.zuzul.zuzulauthenticationservice.common.model.keycloak.Credential;
import com.zuzul.zuzulauthenticationservice.common.model.keycloak.UserKeyCloakPayload;
import com.zuzul.zuzulauthenticationservice.common.usercontext.UserContext;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class RegisterServices {
    private final Keycloak keycloak;
    private final AdminClient adminClient;
    private final Logger logger = LoggerFactory.getLogger(RegisterServices.class);

    // Send to REST API Create user of keycloak
    public RegisterPOSTResponse register(POSTUserPayload payload) {

        if (adminClient.getToken().getAccess_token().length() > 0) {
            // Create header for request
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", MediaType.APPLICATION_JSON.toString());
            headers.add("Authorization", "Bearer " + adminClient.getToken().getAccess_token());

            // Create User Payload
            UserKeyCloakPayload keyCloakPayload = UserKeyCloakPayload
                    .builder()
                    .username(payload.getUsername())
                    .build();

            keyCloakPayload.getCredentials().add(Credential
                    .builder()
                    .value(payload.getPassword())
                    .build());

            // Add header
            HttpEntity<UserKeyCloakPayload> request = new HttpEntity<>(keyCloakPayload, headers);

            //Create url
            String URL_CREATE_USER = keycloak.getDomain() +
                    "/auth/admin/realms/" +
                    keycloak.getRealm() +
                    "/users";

            // Call API
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Void> response = restTemplate.exchange(
                    URL_CREATE_USER,
                    HttpMethod.POST,
                    request,
                    Void.class);

            if (response.getStatusCode() == HttpStatus.CREATED) {
                logger.info("CorrelationID - " +
                        UserContext.getCorrelationId() +
                        " Successfully Register");

                return RegisterPOSTResponse.builder()
                                           .status("Success")
                                           .build();
            } else {
                logger.info("CorrelationID - "
                        +  UserContext.getCorrelationId()
                        + " Failed Register");

                return RegisterPOSTResponse.builder()
                                           .status("Error")
                                           .build();
            }
        }

        logger.info("CorrelationID - "
                +  UserContext.getCorrelationId()
                + " Failed Register");

        return RegisterPOSTResponse.builder()
                                   .status("Error")
                                   .build();
    }
}

package com.zuzul.zuzuladminauthentication.api.v1.login;

import com.ctc.wstx.shaded.msv_core.datatype.xsd.TokenType;
import com.zuzul.zuzuladminauthentication.common.adminclient.AdminClient;
import com.zuzul.zuzuladminauthentication.common.adminclient.Keycloak;
import com.zuzul.zuzuladminauthentication.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzuladminauthentication.common.model.keycloak.CompositeRole;
import com.zuzul.zuzuladminauthentication.common.model.keycloak.Token;
import com.zuzul.zuzuladminauthentication.common.model.keycloak.UserInfo;
import com.zuzul.zuzuladminauthentication.common.usercontext.UserContext;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.ScopeMetadata;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.awt.*;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;


@Service
@RequiredArgsConstructor
public class LoginServices {
    private final Keycloak keycloak;
    private final AdminClient adminClient;
    private final Logger logger = LoggerFactory.getLogger(Logger.class);

    private Token getToken (POSTUserPayload payload) {
        //Add header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED.toString());
        headers.add("Accept", MediaType.APPLICATION_JSON.toString());

        //Add information to FORM_URLENCODED
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", keycloak.getGrant_type());
        requestBody.add("username", payload.getUsername());
        requestBody.add("password", payload.getPassword());
        requestBody.add("client_id", keycloak.getClientID());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        //Get URL access_token
        String URL_GET_ACCESS_TOKEN = keycloak.getDomain()
                + "/auth/realms/"
                + keycloak.getRealm()
                + "/protocol/openid-connect/token";

        //Call API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Token> response = restTemplate.exchange(
            URL_GET_ACCESS_TOKEN,
                HttpMethod.POST,
                request,
                Token.class
        );

        //Return token
        if (response.getStatusCode() == HttpStatus.OK) {
            logger.info("CorrelationID - "
                    +  UserContext.getCorrelationId()
                    + " Success To Get AccessToken");

            return response.getBody();
        } else {
            logger.info("CorrelationID - "
                    +  UserContext.getCorrelationId()
                    + " Failed To Get AccessToken");

            return null;
        }
    }

    private UserInfo getUserInfo(String username) {
        if (adminClient.getToken().getAccess_token().length() > 0) {
            //Add header
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", MediaType.APPLICATION_JSON.toString());
            headers.add("Authorization", "Bearer " + adminClient.getToken().getAccess_token());

            HttpEntity<String> request = new HttpEntity<>(headers);

            //Get URL access_token
            String URL_GET_USERINFO = keycloak.getDomain()
                    + "/auth/admin/realms/"
                    + keycloak.getRealm()
                    + "/users?username="
                    + username
                    + "&exact=true";

            //Call API
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<List<UserInfo>> response = restTemplate.exchange(
                    URL_GET_USERINFO,
                    HttpMethod.GET,
                    request,
                    new ParameterizedTypeReference<>(){}
            );

            List<UserInfo> list = response.getBody();

            assert list != null;
            if (!list.isEmpty()) {
                logger.info("CorrelationID - "
                        +  UserContext.getCorrelationId()
                        + " Success To Get UserID");

                return list.get(0);
            } else {
                logger.info("CorrelationID - "
                        +  UserContext.getCorrelationId()
                        + " Failed To Get UserID");

                return null;
            }
        }

        logger.info("CorrelationID - "
                +  UserContext.getCorrelationId()
                + " Failed To Get UserID");
        return null;
    }

    private List<CompositeRole> getRoles (String userID) {

        if (adminClient.getToken().getAccess_token().length() > 0) {
            // Create header
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Type", MediaType.APPLICATION_JSON.toString());
            headers.add("Authorization", "Bearer " + adminClient.getToken().getAccess_token());

            // Add header to request
            HttpEntity<String> request = new HttpEntity<>(headers);

            // URL
            String URL_LIST_USER_ROLE = keycloak.getDomain()
                    + "/auth/admin/realms/"
                    + keycloak.getRealm()
                    + "/users/"
                    + userID
                    + "/role-mappings/realm/composite";


            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<List<CompositeRole>> response = restTemplate.exchange(
                    URL_LIST_USER_ROLE,
                    HttpMethod.GET,
                    request,
                    new ParameterizedTypeReference<>(){});

            List<CompositeRole> list = response.getBody();

            assert list != null;
            if (!list.isEmpty()) {
                logger.info("CorrelationID - "
                        +  UserContext.getCorrelationId()
                        + " Success To Get Role");

                return list;
            } else {
                logger.info("CorrelationID - "
                        +  UserContext.getCorrelationId()
                        + " Failed To Get Role");

                return null;
            }
        }

        logger.info("CorrelationID - "
                +  UserContext.getCorrelationId()
                + " Failed To Get Role");

        return null;
    }

    public LoginPOSTResponse login (POSTUserPayload payload) {
        Token token = getToken(payload);
        UserInfo userInfo = getUserInfo(payload.getUsername());

        assert userInfo != null;
        List<CompositeRole> compositeRoles = getRoles(userInfo.getId());
        if (token != null && !Objects.requireNonNull(compositeRoles).isEmpty()) {
            AtomicReference<String> role = new AtomicReference<>("");
            compositeRoles.forEach(compositeRole -> {
                if (compositeRole.getName().equals("UN_INFO")) {
                    role.set("UN_INFO");
                } else if (compositeRole.getName().equals("NORMAL")) {
                    role.set("NORMAL");
                }
            });
            return LoginPOSTResponse
                    .builder()
                    .userID(userInfo.getId())
                    .access_token(token.getAccess_token())
                    .role(role.get())
                    .build();
        }
        else {
            logger.info("CorrelationID - "
                    +  UserContext.getCorrelationId()
                    + " Failed To Login");

            return null;
        }
    }
}

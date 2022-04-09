package com.zuzul.zuzuluserservice.testPub.integrationTest;

import com.zuzul.zuzuluserservice.api.v1.pub.login.LoginServices;
import com.zuzul.zuzuluserservice.common.adminclient.Keycloak;
import com.zuzul.zuzuluserservice.common.model.keycloak.Token;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.apache.http.entity.ContentType;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.*;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;
import lombok.RequiredArgsConstructor;

import javax.ws.rs.PUT;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testLoginValid() throws Exception {
        this.mockMvc
                .perform(post(Constant.rootPathV1 + "/pub/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"minh\",\"password\":\"minh\"}"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.access_token").isNotEmpty())
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.userID").isNotEmpty())
                .andExpect(jsonPath("$.activatedShop").value(true));
    }
}

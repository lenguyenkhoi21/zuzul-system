package com.zuzul.zuzuluserservice.testPub.unitTest;

import com.zuzul.zuzuluserservice.api.v1.admin.login.LoginAdmin;
import com.zuzul.zuzuluserservice.api.v1.pub.register.RegisterPOSTResponse;
import com.zuzul.zuzuluserservice.api.v1.pub.register.RegisterServices;
import com.zuzul.zuzuluserservice.common.adminclient.AdminClient;
import com.zuzul.zuzuluserservice.common.adminclient.Keycloak;
import com.zuzul.zuzuluserservice.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzuluserservice.common.model.keycloak.CompositeRole;
import com.zuzul.zuzuluserservice.common.model.keycloak.Token;
import com.zuzul.zuzuluserservice.common.model.keycloak.UserInfo;
import com.zuzul.zuzuluserservice.common.model.keycloak.UserKeyCloakPayload;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class UserRegisterUnitTest {
    Keycloak keycloak;
    AdminClient adminClient;
    RegisterServices registerServices;

    @BeforeEach
    void setup(){
        keycloak = new Keycloak("a.com", "minh", "minh", "1", "gt", "realm");
        adminClient = Mockito.mock(AdminClient.class);
        registerServices = Mockito.spy(new RegisterServices(keycloak, adminClient));
    }
    @Test
    public void signin() throws Exception {
        POSTUserPayload payload = new POSTUserPayload("minh","minh");
        HttpHeaders headers = Mockito.mock(HttpHeaders.class);
        UserKeyCloakPayload keyCloakPayload = Mockito.mock(UserKeyCloakPayload.class);
//        Mockito.doReturn()
        RegisterPOSTResponse response = registerServices.register(payload);
        Assert.assertEquals(response.getStatus(),"Success");
    }
}


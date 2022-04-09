package com.zuzul.zuzuluserservice.admin.unitTest;

import com.zuzul.zuzuluserservice.api.v1.admin.login.LoginAdmin;
import com.zuzul.zuzuluserservice.api.v1.admin.login.POSTLoginAdminResponse;
import com.zuzul.zuzuluserservice.common.adminclient.AdminClient;
import com.zuzul.zuzuluserservice.common.adminclient.Keycloak;
import com.zuzul.zuzuluserservice.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzuluserservice.common.model.keycloak.CompositeRole;
import com.zuzul.zuzuluserservice.common.model.keycloak.Token;
import com.zuzul.zuzuluserservice.common.model.keycloak.UserInfo;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class AdminLoginUnitTest {
    Keycloak keycloak;
    AdminClient adminClient;
    LoginAdmin loginAdmin;

    @BeforeEach
    void setup(){
        keycloak = new Keycloak("a.com", "minh", "minh", "1", "gt", "realm");
        adminClient = Mockito.mock(AdminClient.class);
        loginAdmin = Mockito.spy(new LoginAdmin(keycloak, adminClient));
    }
    @Test
    public void logIn() throws Exception {
        POSTUserPayload payload = new POSTUserPayload("minh", "minh");
        Token token = Mockito.mock(Token.class);
        UserInfo info = Mockito.mock(UserInfo.class);
        List<CompositeRole> compositeRoles = new ArrayList<>();
        compositeRoles.add(new CompositeRole("1", "ADMIN", true, true, "1"));
        Mockito.doReturn("1").when(info).getId();
        Mockito.doReturn(token).when(loginAdmin).getToken(payload);
        Mockito.doReturn(info).when(loginAdmin).getUserID(Mockito.anyString());
        Mockito.doReturn(compositeRoles).when(loginAdmin).getRole(Mockito.anyString());
        Assert.assertNotNull(loginAdmin.login(payload));
    }
}


package com.zuzul.zuzuluserservice.admin.unitTest;

import com.zuzul.zuzuluserservice.api.v1.admin.login.LoginAdmin;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request.AcceptShopRequest;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request.PUTAcceptShopResponse;
import com.zuzul.zuzuluserservice.common.adminclient.AdminClient;
import com.zuzul.zuzuluserservice.common.adminclient.Keycloak;
import com.zuzul.zuzuluserservice.common.model.api.v1.POSTUserPayload;
import com.zuzul.zuzuluserservice.common.model.keycloak.CompositeRole;
import com.zuzul.zuzuluserservice.common.model.keycloak.Token;
import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class AcceptShopRequestUnitTest {
    UserInfoRepository userInfoRepository;
    AcceptShopRequest acceptShopRequest;

    @BeforeEach
    void setup(){
        userInfoRepository = Mockito.spy(UserInfoRepository.class);
        acceptShopRequest = new AcceptShopRequest(userInfoRepository);
    }
    @Test
    public void AcceptShop() throws Exception {
        UserInfo userInfo = Mockito.mock(UserInfo.class);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d").when(principal).getName();
        Mockito.doReturn(userInfo).when(userInfoRepository).findUserInfoByUserId("u1");
        PUTAcceptShopResponse response = acceptShopRequest.acceptRequestShop("accept","u1",principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


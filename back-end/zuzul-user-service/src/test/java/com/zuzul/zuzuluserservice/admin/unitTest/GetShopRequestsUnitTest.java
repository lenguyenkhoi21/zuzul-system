package com.zuzul.zuzuluserservice.admin.unitTest;

import com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request.AcceptShopRequest;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request.PUTAcceptShopResponse;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop.GetRequestShop;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop.UserInfoModel;
import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
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
public class GetShopRequestsUnitTest {
    UserInfoRepository userInfoRepository;
    AddressRepository addressRepository;
    GetRequestShop getRequestShop;

    @BeforeEach
    void setup(){
        userInfoRepository = Mockito.spy(UserInfoRepository.class);
        addressRepository = Mockito.spy(AddressRepository.class);
        getRequestShop = new GetRequestShop(userInfoRepository,addressRepository);
    }
    @Test
    public void getRequestShop() throws Exception {
        List<UserInfo> userInfos = new ArrayList<>();
        userInfos.add(Mockito.mock(UserInfo.class));
        Principal principal = Mockito.spy(Principal.class);
        Address address = Mockito.mock(Address.class);
        Mockito.doReturn(address).when(addressRepository).findAddressByUserIdAndType(Mockito.any(),Mockito.eq(true));
        Mockito.doReturn("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d").when(principal).getName();
        Mockito.doReturn(userInfos).when(userInfoRepository).findAllBySendRequest(true);
        List<UserInfoModel> results = getRequestShop.getRequestShop(principal);
        Assert.assertEquals(results.size(),1);
    }
}


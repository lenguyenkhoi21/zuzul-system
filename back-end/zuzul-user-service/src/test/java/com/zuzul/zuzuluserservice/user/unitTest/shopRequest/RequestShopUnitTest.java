package com.zuzul.zuzuluserservice.user.unitTest.shopRequest;

import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.ChangeNumberItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.PUTRequestShopPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.PUTRequestShopResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.RequestShop;
import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;


@SpringBootTest
public class RequestShopUnitTest {
    UserInfoRepository userInfoRepository;
    AddressRepository addressRepository;
    RequestShop requestShop;

    @BeforeEach
    void setup(){
        addressRepository = Mockito.spy(AddressRepository.class);
        userInfoRepository = Mockito.spy(UserInfoRepository.class);
        requestShop = new RequestShop(userInfoRepository,addressRepository);
    }
    @Test
    public void request() throws Exception {

        UserInfo userInfo = Mockito.mock(UserInfo.class);
        Address address = Mockito.mock(Address.class);
        PUTRequestShopPayload payload = new PUTRequestShopPayload("a",1l);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(address).when(addressRepository).findAddressByUserIdAndType("u1",true);
        Mockito.doReturn(userInfo).when(userInfoRepository).findUserInfoByUserId(Mockito.any());
        PUTRequestShopResponse response = requestShop.requestShop("u1",payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


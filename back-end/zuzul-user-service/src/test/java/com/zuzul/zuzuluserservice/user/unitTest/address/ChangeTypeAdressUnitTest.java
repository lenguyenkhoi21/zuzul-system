package com.zuzul.zuzuluserservice.user.unitTest.address;

import com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop.GetRequestShop;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop.UserInfoModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.ChangeTypeAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.PUTChangeTypeAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.PUTChangeTypeAddressResponse;
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
public class ChangeTypeAdressUnitTest {
    AddressRepository addressRepository;
    ChangeTypeAddress changeTypeAddress;

    @BeforeEach
    void setup(){
        addressRepository = Mockito.spy(AddressRepository.class);
        changeTypeAddress = new ChangeTypeAddress(addressRepository);
    }
    @Test
    public void changeDefault() throws Exception {
        PUTChangeTypeAddressPayload payload = new PUTChangeTypeAddressPayload("u1","a1");
        Address address = Mockito.mock(Address.class);
        Address defaultAddress = Mockito.mock(Address.class);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(address).when(addressRepository).findAddressByAddressId(Mockito.any());
        Mockito.doReturn(defaultAddress).when(addressRepository).findAddressByUserIdAndType(Mockito.any(),Mockito.eq(true));
        PUTChangeTypeAddressResponse response = changeTypeAddress.setDefault(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


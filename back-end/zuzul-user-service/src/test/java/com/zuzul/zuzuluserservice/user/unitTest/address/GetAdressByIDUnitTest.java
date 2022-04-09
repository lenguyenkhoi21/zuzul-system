package com.zuzul.zuzuluserservice.user.unitTest.address;

import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_address_by_id.GETAddressByIdResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_address_by_id.GetAddressById;
import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class GetAdressByIDUnitTest {
    AddressRepository addressRepository;
    GetAddressById getAddressById;

    @BeforeEach
    void setup(){
        addressRepository = Mockito.spy(AddressRepository.class);
        getAddressById = new GetAddressById(addressRepository);
    }
    @Test
    public void GetById() throws Exception {
        Address address = Mockito.mock(Address.class);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("username").when(address).getUserName();
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(address).when(addressRepository).findAddressByAddressId("a1");
        GETAddressByIdResponse response = getAddressById.getAddressById("u1", "a1", principal);
        Assert.assertEquals(response.getUserName(), "username");
    }
}


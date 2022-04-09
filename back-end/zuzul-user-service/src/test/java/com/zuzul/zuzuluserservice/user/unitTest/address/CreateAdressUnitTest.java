package com.zuzul.zuzuluserservice.user.unitTest.address;

import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.ChangeTypeAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.PUTChangeTypeAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.PUTChangeTypeAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressResponse;
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
public class CreateAdressUnitTest {
    AddressRepository addressRepository;
    CreateAddress createAddress;

    @BeforeEach
    void setup(){
        addressRepository = Mockito.spy(AddressRepository.class);
        createAddress = new CreateAddress(addressRepository);
    }
    @Test
    public void PostAddress() throws Exception {

        List<Address> addressList = new ArrayList<>();
        Address address = Mockito.mock(Address.class);
        addressList.add(address);
        POSTCreateAddressPayload payload = new POSTCreateAddressPayload("a","1","ward","district","city","aa","u1",true);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(addressList).when(addressRepository).findAllByUserId("u1");
        POSTCreateAddressResponse response = createAddress.createAddress(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


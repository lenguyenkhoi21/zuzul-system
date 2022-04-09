package com.zuzul.zuzuluserservice.user.unitTest.address;

import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.PUTUpdateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.PUTUpdateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.UpdateAddress;
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
public class UpdateAdressUnitTest {
    AddressRepository addressRepository;
    UpdateAddress updateAddress;

    @BeforeEach
    void setup(){
        addressRepository = Mockito.spy(AddressRepository.class);
        updateAddress = new UpdateAddress(addressRepository);
    }
    @Test
    public void PutAddress() throws Exception {
        Address address = Mockito.mock(Address.class);
        PUTUpdateAddressPayload payload = new PUTUpdateAddressPayload("a","1","ward","district","city","aa","u1","a1");
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(address).when(addressRepository).findAddressByAddressId("a1");
        PUTUpdateAddressResponse response = updateAddress.updateAddress(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


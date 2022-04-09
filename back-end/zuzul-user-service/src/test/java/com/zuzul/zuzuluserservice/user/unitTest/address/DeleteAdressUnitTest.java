package com.zuzul.zuzuluserservice.user.unitTest.address;

import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DELETEAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DELETEAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DeleteAddress;
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
public class DeleteAdressUnitTest {
    AddressRepository addressRepository;
    DeleteAddress deleteAddress;

    @BeforeEach
    void setup(){
        addressRepository = Mockito.spy(AddressRepository.class);
        deleteAddress = new DeleteAddress(addressRepository);
    }
    @Test
    public void DelAddress() throws Exception {

        DELETEAddressPayload payload = new DELETEAddressPayload("u1","a1");
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(1l).when(addressRepository).deleteAddressByAddressId("a1");
        DELETEAddressResponse response = deleteAddress.deleteAddress(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


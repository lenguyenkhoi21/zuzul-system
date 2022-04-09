package com.zuzul.zuzuluserservice.user.unitTest.address;

import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_address_by_id.GETAddressByIdResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_address_by_id.GetAddressById;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.AddressModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.GetAllAddress;
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
public class GetAllAdressesUnitTest {
    AddressRepository addressRepository;
    GetAllAddress getAllAddress;

    @BeforeEach
    void setup(){
        addressRepository = Mockito.spy(AddressRepository.class);
        getAllAddress = new GetAllAddress(addressRepository);
    }
    @Test
    public void GetAll() throws Exception {
        List<Address> addressList = new ArrayList<>();
        addressList.add(Mockito.mock(Address.class));
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(addressList).when(addressRepository).findAllByUserId(Mockito.anyString());
        List<AddressModel> result = getAllAddress.getAllAddress("u1",principal);
        Assert.assertEquals(result.size(), 1);
    }
}


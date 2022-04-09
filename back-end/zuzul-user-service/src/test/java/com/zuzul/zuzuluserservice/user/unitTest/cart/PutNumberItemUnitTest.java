package com.zuzul.zuzuluserservice.user.unitTest.cart;

import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.ChangeNumberItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.PUTUpdateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.PUTUpdateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.UpdateAddress;
import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;


@SpringBootTest
public class PutNumberItemUnitTest {
    CartRepository cartRepository;
    ChangeNumberItems changeNumberItems;

    @BeforeEach
    void setup(){
        cartRepository = Mockito.spy(CartRepository.class);
        changeNumberItems = new ChangeNumberItems(cartRepository);
    }
    @Test
    public void ChangeNumber() throws Exception {
        Cart cart = Mockito.mock(Cart.class);
        PUTNumberItemsPayload payload = new PUTNumberItemsPayload("1","u1",1);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(cart).when(cartRepository).findCartByPurchaserIdAndProductId("u1","1");
        PUTNumberItemsResponse response = changeNumberItems.changeNumberItems(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


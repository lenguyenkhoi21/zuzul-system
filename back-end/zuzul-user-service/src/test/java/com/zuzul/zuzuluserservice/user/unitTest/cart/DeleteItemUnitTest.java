package com.zuzul.zuzuluserservice.user.unitTest.cart;

import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DELETEItemInCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DELETEItemInCartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DeleteItem;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DELETEAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DELETEAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DeleteAddress;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;


@SpringBootTest
public class DeleteItemUnitTest {
    CartRepository cartRepository;
    DeleteItem deleteItem;

    @BeforeEach
    void setup(){
        cartRepository = Mockito.spy(CartRepository.class);
        deleteItem = new DeleteItem(cartRepository);
    }
    @Test
    public void DelItem() throws Exception {

        DELETEItemInCartPayload payload = new DELETEItemInCartPayload("u1","1");
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(0l).when(cartRepository).deleteCartByPurchaserIdAndProductId("u1","1");
        DELETEItemInCartResponse response = deleteItem.deleteItemInCart(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


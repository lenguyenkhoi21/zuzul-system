package com.zuzul.zuzuluserservice.user.unitTest.cart;

import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.AddItemToCart;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.POSTItemToCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.POSTItemToCartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressResponse;
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
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class AddToCartUnitTest {
    CartRepository cartRepository;
    AddItemToCart addItemToCart;

    @BeforeEach
    void setup(){
        cartRepository = Mockito.spy(CartRepository.class);
        addItemToCart = new AddItemToCart(cartRepository);
    }
    @Test
    public void PostAddress() throws Exception {
        Cart checkcart = Mockito.mock(Cart.class);
        POSTItemToCartPayload payload = new POSTItemToCartPayload("p1","u1","s1",2);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(checkcart).when(cartRepository).findCartByPurchaserIdAndProductId("u1","p1");
        POSTItemToCartResponse response = addItemToCart.addItemToCart(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


package com.zuzul.zuzuluserservice.user.unitTest.cart;

import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.CartModel;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GETAllItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GetAllItems;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.AddressModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.GetAllAddress;
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
public class GetAllItemsUnitTest {
    CartRepository cartRepository;
    GetAllItems getAllItems;

    @BeforeEach
    void setup(){
        cartRepository = Mockito.spy(CartRepository.class);
        getAllItems = new GetAllItems(cartRepository);
    }
    @Test
    public void GetAll() throws Exception {
        List<Cart> items = new ArrayList<>();
        items.add(Mockito.mock(Cart.class));
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(items).when(cartRepository).findAllByPurchaserId("u1");
        GETAllItemsResponse response = getAllItems.getAllItemsInCart("u1",principal);
        Assert.assertEquals(response.getStatus(), "SUCCESS");
    }
}


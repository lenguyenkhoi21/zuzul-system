package com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items;

import com.zuzul.zuzuluserservice.api.v1.user.cart.CartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GetAllItems;
import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class ChangeNumberItems {
    private final CartRepository cartRepository;
    private final GetAllItems getAllItems;

    public CartResponse changeNumberItems (PUTNumberItemsPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getPurchaserId())) {
            Cart cart = cartRepository.findCartByPurchaserIdAndProductId(payload.getPurchaserId(), payload.getProductId());

            Cart updatedCart = Cart
                    .builder()
                    .id(cart.getId())
                    .productId(cart.getProductId())
                    .purchaserId(cart.getPurchaserId())
                    .sellerId(cart.getSellerId())
                    .count(payload.getCount())
                    .build();

            cartRepository.save(updatedCart);

            CartResponse getCart = getAllItems.getAllItemsInCart(payload.getPurchaserId(), principal);

            return getCart;
        }

        return CartResponse.builder().build();
    }
}

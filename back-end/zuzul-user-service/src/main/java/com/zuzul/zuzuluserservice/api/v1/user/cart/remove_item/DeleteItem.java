package com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item;

import com.zuzul.zuzuluserservice.api.v1.user.cart.CartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GetAllItems;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@RequiredArgsConstructor
@Service
public class DeleteItem {
    private final CartRepository cartRepository;
    private final GetAllItems getAllItems;

    public CartResponse deleteItemInCart (DELETEItemInCartPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getPurchaserId())) {
            long isDeleted = cartRepository.deleteCartByPurchaserIdAndProductId(payload.getPurchaserId(), payload.getProductId());

            CartResponse cartResponse = getAllItems.getAllItemsInCart(payload.getPurchaserId(), principal);

            if (isDeleted == 0)
                return CartResponse
                        .builder()
                        .alert(false)
                        .cartModelList(cartResponse.getCartModelList())
                        .totalMoney(cartResponse.getTotalMoney())
                        .build();
            else
                return CartResponse
                        .builder()
                        .alert(true)
                        .cartModelList(cartResponse.getCartModelList())
                        .totalMoney(cartResponse.getTotalMoney())
                        .build();


        }
        return CartResponse.builder().build();
    }
}

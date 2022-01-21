package com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items;

import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class ChangeNumberItems {
    private final CartRepository cartRepository;

    public PUTNumberItemsResponse changeNumberItems (PUTNumberItemsPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getPurchaserId())) {
            Cart cart = cartRepository.findCartByPurchaserIdAndProductId(payload.getPurchaserId(), payload.getProductId());

            Cart updatedCart = Cart
                    .builder()
                    .id(cart.getId())
                    .productId(cart.getProductId())
                    .productSales(cart.getProductSales())
                    .purchaserId(cart.getPurchaserId())
                    .sellerId(cart.getSellerId())
                    .originPrice(cart.getOriginPrice())
                    .count(payload.getCount())
                    .build();

            cartRepository.save(updatedCart);

            return PUTNumberItemsResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }

        return PUTNumberItemsResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

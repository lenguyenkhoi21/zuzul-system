package com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item;

import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@RequiredArgsConstructor
@Service
public class DeleteItem {
    private final CartRepository cartRepository;

    public DELETEItemInCartResponse deleteItemInCart (DELETEItemInCartPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getPurchaserId())) {
            long isDeleted = cartRepository.deleteCartByPurchaserIdAndProductId(payload.getPurchaserId(), payload.getProductId());

            if (isDeleted == 0)
                return DELETEItemInCartResponse
                        .builder()
                        .status("SUCCESS")
                        .build();
            else
                return DELETEItemInCartResponse
                        .builder()
                        .status("FAIL")
                        .build();
        }
        return DELETEItemInCartResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

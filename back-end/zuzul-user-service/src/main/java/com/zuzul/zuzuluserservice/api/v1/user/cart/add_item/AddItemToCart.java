package com.zuzul.zuzuluserservice.api.v1.user.cart.add_item;

import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class AddItemToCart {
    private final CartRepository cartRepository;

    public POSTItemToCartResponse addItemToCart (POSTItemToCartPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getPurchaserId())) {
            //Kiểm tra xem product này đã nằm trong cart chưa
            Cart checkCart = cartRepository.findCartByPurchaserIdAndProductId(payload.getPurchaserId(), payload.getProductId());

            if (payload.getPurchaserId().equals(payload.getSellerId())) {
                return POSTItemToCartResponse
                        .builder()
                        .status("FAIL")
                        .build();
            }

            //Chưa thì thêm vào
            if (checkCart == null) {
                Cart cart = Cart
                        .builder()
                        .productId(payload.getProductId())
                        .purchaserId(payload.getPurchaserId())
                        .sellerId(payload.getSellerId())
                        .count(payload.getCount())
                        .build();


                cartRepository.save(cart);

                return POSTItemToCartResponse
                        .builder()
                        .status("SUCCESS")
                        .build();
            }
            //Đã cò thì count cũ + count mới
            else {
                Cart cart = Cart
                        .builder()
                        .id(checkCart.getId())
                        .productId(checkCart.getProductId())
                        .purchaserId(checkCart.getPurchaserId())
                        .sellerId(checkCart.getSellerId())
                        .count(checkCart.getCount() + payload.getCount())
                        .build();


                cartRepository.save(cart);

                return POSTItemToCartResponse
                        .builder()
                        .status("SUCCESS")
                        .build();
            }

        }

        return POSTItemToCartResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

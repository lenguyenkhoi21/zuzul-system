package com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items;

import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllItems {
    private final CartRepository cartRepository;

    public GETAllItemsResponse getAllItemsInCart (GETAllItemsPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getPurchaserId())) {
            List<Cart> items = cartRepository.findAllByPurchaserId(payload.getPurchaserId());

            List<CartModel> cartModels = new ArrayList<>();

            items.forEach(item -> {
                cartModels.add(
                  CartModel
                          .builder()
                          .count(item.getCount())
                          .originPrice(item.getOriginPrice())
                          .productId(item.getProductId())
                          .productSales(item.getProductSales())
                          .purchaserId(item.getPurchaserId())
                          .sellerId(item.getSellerId())
                          .build()
                );
            });

            return GETAllItemsResponse
                    .builder()
                    .items(cartModels)
                    .status("SUCCESS")
                    .build();
        }

        return GETAllItemsResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

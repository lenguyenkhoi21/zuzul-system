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

    public GETAllItemsResponse getAllItemsInCart (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<Cart> items = cartRepository.findAllByPurchaserId(userId);

            List<CartModel> cartModels = new ArrayList<>();

            items.forEach(item -> cartModels.add(
              CartModel
                      .builder()
                      .count(item.getCount())
                      .sellerId(item.getSellerId())
                      .productId(item.getProductId())
                      .purchaserId(item.getPurchaserId())
                      //TODO Call product-private to get corresponding data by productId

                      .productName("")
                      .productSales(0)
                      .originPrice(0)
                      .build()
            ));

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

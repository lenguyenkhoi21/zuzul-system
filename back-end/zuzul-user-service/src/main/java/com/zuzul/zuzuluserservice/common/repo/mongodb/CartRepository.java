package com.zuzul.zuzuluserservice.common.repo.mongodb;

import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findCartByPurchaserIdAndProductId(String purchaserId, String productId);
    List<Cart> findAllByPurchaserId(String purchaserId);
    long deleteCartByPurchaserIdAndProductId(String purchaserId, String productId);
}

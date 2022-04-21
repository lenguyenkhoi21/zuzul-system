package com.zuzul.zuzuluserservice.common.repo.mongodb;

import com.zuzul.zuzuluserservice.common.model.mongodb.HistoryShop;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HistoryShopRepository extends MongoRepository<HistoryShop, String> {
    List<HistoryShop> findAllByUserIdAndStatusAndAndCategoryId(String userId, String status, String categoryId);
    List<HistoryShop> findAllByUserId(String userId);
    List<HistoryShop> findAllByUserIdAndStatus(String userId, String status);
    List<HistoryShop> findAllByUserIdAndCategoryId(String userId, String categoryId);
    Optional<HistoryShop> findById (String historyId);
    List<HistoryShop> findAllByHistoryId(String historyId);
    boolean deleteHistoryShopByPurchaserIdAndProductNameAndHistoryId(String purchaserId, String productName, String historyId);
}

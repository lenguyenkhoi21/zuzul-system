package com.zuzul.zuzuluserservice.common.repo.mongodb;

import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderDetailsRepository extends MongoRepository<OrderDetails, String> {
    List<OrderDetails> findAllByHistoryId(String id);
}

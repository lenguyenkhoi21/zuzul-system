package com.zuzul.zuzuluserservice.common.repo.mongodb;

import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface OrderDetailsRepository extends MongoRepository<OrderDetails, String> {
    List<OrderDetails> findAllByHistoryId(String id);
    long deleteOrderDetailsById(String id);
    @Query(value = "{'historyId' : ?0, 'productName' : ?1}")
    OrderDetails findOrderDetails(String historyId, String productName);
    long deleteOrderDetailsByHistoryIdAndProductName (String historyId, String productName);
}

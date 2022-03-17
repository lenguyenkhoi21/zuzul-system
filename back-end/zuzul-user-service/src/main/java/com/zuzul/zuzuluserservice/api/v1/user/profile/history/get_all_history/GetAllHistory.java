package com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history;

import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.OrderDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllHistory {
    private final HistoryRepository historyRepository;
    private final OrderDetailsRepository orderDetailsRepository;

    public List<HistoryModel> getAllHistory (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<History> histories = historyRepository.findAllByUserId(userId);
            List<HistoryModel> historyModels = new ArrayList<>();

            histories.forEach(history -> {
                List <OrderDetails> orderDetailsList = orderDetailsRepository
                        .findAllByHistoryId(history.getHistoryId());
                List<String> productName = new ArrayList<>();
                orderDetailsList.forEach(orderDetails ->
                        productName.add(orderDetails.getProductName())
                        );
                historyModels.add(
                    HistoryModel
                            .builder()
                            .historyId(history.getHistoryId())
                            .dateCreated(history.getDateCreated())
                            .productName(productName)
                            .totalPrice(history.getTotalPrice())
                            .build());
            });

            return historyModels;
        }
        return new ArrayList<>();
    }
}

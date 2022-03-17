package com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details;

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
public class GetHistoryDetail {
    private final OrderDetailsRepository orderDetailsRepository;
    private final HistoryRepository historyRepository;

    public GETHistoryDetailResponse getHistoryDetail (String userId, String historyId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<OrderDetails> orderDetailsList = orderDetailsRepository.findAllByHistoryId(historyId);

            List<OrderDetailsModel> orderDetailsModels = new ArrayList<>();

            History history = historyRepository.findByHistoryId(historyId);

            orderDetailsList.forEach(order -> {
                orderDetailsModels.add(OrderDetailsModel
                        .builder()
                        .count(order.getCount())
                        .discount(order.getDiscount())
                        .productName(order.getProductName())
                        .originPrice(order.getOriginPrice())
                        .sellerId(order.getSellerId())
                        .status(order.getStatus())
                        .build());
            });

            return GETHistoryDetailResponse
                    .builder()
                    .address(history.getAddress())
                    .paymentType(history.getPaymentType())
                    .phone(history.getPhone())
                    .userName(history.getUserName())
                    .orderDetailsList(orderDetailsModels)
                    .build();
        }
        return GETHistoryDetailResponse
                .builder()
                .build();
    }
}

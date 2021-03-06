package com.zuzul.zuzuluserservice.api.v1.user.profile.history.cancel_order;

import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import com.zuzul.zuzuluserservice.common.model.mongodb.HistoryShop;
import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryShopRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.OrderDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PUTCancelOrder {
    private final OrderDetailsRepository orderDetailsRepository;
    private final HistoryShopRepository historyShopRepository;
    private final HistoryRepository historyRepository;

    public PUTCancelOrderResponse cancelOrder (PUTCancelOrderPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            if (historyShopRepository.findAllByHistoryId(payload.getHistoryId()).size() != 0) {
                historyShopRepository.deleteHistoryShopByPurchaserIdAndProductNameAndHistoryId(payload.getUserId(), payload.getProductName(), payload.getHistoryId());
            }
            if (orderDetailsRepository.findAllByHistoryId(payload.getHistoryId()).size() != 0) {
                orderDetailsRepository.deleteOrderDetailsById(payload.getId());
            }
            if (historyShopRepository.findAllByHistoryId(payload.getHistoryId()).size() == 0 && orderDetailsRepository.findAllByHistoryId(payload.getHistoryId()).size() == 0) {
                historyRepository.deleteHistoryByHistoryId(payload.getHistoryId());
            }

            History history = historyRepository.findByHistoryId(payload.getHistoryId());
            List<OrderDetails> orderDetailsList = orderDetailsRepository.findAllByHistoryId(payload.getHistoryId());

            if (orderDetailsList.size() != 0) {
                int totalPrice = 0;

                for (OrderDetails orderDetails : orderDetailsList) {
                    totalPrice += (orderDetails.getOriginPrice() * orderDetails.getCount())
                            - (orderDetails.getOriginPrice() * orderDetails.getCount() * orderDetails.getDiscount() / 100);
                }

                history.setTotalPrice(totalPrice);

                historyRepository.save(history);
            }

            return PUTCancelOrderResponse.builder().status("SUCCESS").build();
        }
        return PUTCancelOrderResponse.builder().status("FAIL").build();
    }
}

package com.zuzul.zuzuluserservice.api.v1.user.profile.history.cancel_order;

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
            historyShopRepository.deleteHistoryShopByPurchaserIdAndProductNameAndHistoryId(payload.getUserId(), payload.getProductName(), payload.getHistoryId());
            orderDetailsRepository.deleteOrderDetailsById(payload.getId());

            if (historyShopRepository.findAllByHistoryId(payload.getHistoryId()).size() == 0 || orderDetailsRepository.findAllByHistoryId(payload.getHistoryId()).size() == 0) {
                historyRepository.deleteHistoryByHistoryId(payload.getHistoryId());
            }

            return PUTCancelOrderResponse.builder().status("SUCCESS").build();
        }
        return PUTCancelOrderResponse.builder().status("FAIL").build();
    }
}

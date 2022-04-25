package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.cancel_order;

import com.zuzul.zuzuluserservice.api.v1.user.profile.history.cancel_order.PUTCancelOrderResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.GetAllHistoryShop;
import com.zuzul.zuzuluserservice.common.model.mongodb.History;
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
public class CancelOrderShopService {
    private final HistoryRepository historyRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final HistoryShopRepository historyShopRepository;
    private final GetAllHistoryShop getAllHistoryShop;

    public PUTCancelOrderShopResponse cancelOrderShop (PUTCancelOrderShopPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            if (historyShopRepository.findAllByHistoryId(payload.getHistoryId()).size() != 0) {
                historyShopRepository.deleteHistoryShopById(payload.getId());
            }
            if (orderDetailsRepository.findAllByHistoryId(payload.getHistoryId()).size() != 0) {
                orderDetailsRepository.deleteOrderDetailsByHistoryIdAndProductName(payload.getHistoryId(), payload.getProductName());
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

            return PUTCancelOrderShopResponse
                    .builder()
                    .status("SUCCESS")
                    .historyShopModelsList(getAllHistoryShop.getAllHistoryShop(payload.getUserId(), payload.getFilterStatus(), principal))
                    .build();
        }
        return PUTCancelOrderShopResponse.builder().status("FAIL").build();
    }
}

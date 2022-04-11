package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.accept_order;

import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.GetAllHistoryShop;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.HistoryShopModels;
import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import com.zuzul.zuzuluserservice.common.model.mongodb.HistoryShop;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChangeStateOrder {
    private final HistoryShopRepository historyShopRepository;
    private final GetAllHistoryShop getAllHistoryShop;

    public List<HistoryShopModels> changeOrder (PUTChangeStateOrderPayload payload, Principal principal) {
        if(principal.getName().equals(payload.getUserId())) {
            Optional<HistoryShop> find = historyShopRepository.findById(payload.getHistoryId());

            HistoryShop historyShop = find.get();

            switch (payload.getStatus()) {
                case "WAIT_FOR_ACCEPTING":
                    historyShop.setStatus("WAIT_FOR_GETTING");
                    break;
                case "WAIT_FOR_GETTING":
                    historyShop.setStatus("DELIVERING");
                    break;
                case "DELIVERING":
                    historyShop.setStatus("DELIVERED");
                    break;
            }

            historyShopRepository.save(historyShop);

            return getAllHistoryShop.getAllHistoryShop(payload.getUserId(), payload.getFilterStatus(), principal);
        }

        return new ArrayList<>();
    }
}

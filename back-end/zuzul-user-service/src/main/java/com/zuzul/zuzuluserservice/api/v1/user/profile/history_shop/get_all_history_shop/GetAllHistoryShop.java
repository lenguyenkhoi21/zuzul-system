package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop;

import com.zuzul.zuzuluserservice.common.model.mongodb.HistoryShop;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GetAllHistoryShop {
    private final HistoryShopRepository historyShopRepository;
    private static final String ALL = "ALL";

    public List<HistoryShopModels> getAllHistoryShop (String userId, String status, String categoryId,  Principal principal) {
        if (principal.getName().equals(userId)) {
            List<HistoryShop> historyShops = null;

            if (status.equals(ALL) && categoryId.equals(ALL)) {
                historyShops = historyShopRepository.findAllByUserId(userId);
            }

            if (!status.equals(ALL) && categoryId.equals(ALL)) {
                historyShops = historyShopRepository.findAllByUserIdAndStatus(userId, status);
            }

            if (status.equals(ALL) && !categoryId.equals(ALL)) {
                historyShops = historyShopRepository.findAllByUserIdAndCategoryId(userId, categoryId);
            }

            if (!status.equals(ALL) && !categoryId.equals(ALL)) {
                historyShops = historyShopRepository.findAllByUserIdAndStatusAndAndCategoryId(userId, status, categoryId);
            }

            List<HistoryShopModels> historyShopModels = new ArrayList<>();
            if (historyShops.size() > 0) {
                historyShops.forEach(historyShop -> {
                    historyShopModels.add(HistoryShopModels
                            .builder()
                            .count(historyShop.getCount())
                            .dateCreated(historyShop.getDateCreated())
                            .historyId(historyShop.getHistoryId())
                            .discount(historyShop.getDiscount())
                            .originPrice(historyShop.getOriginPrice())
                            .productName(historyShop.getProductName())
                            .purchaserId(historyShop.getPurchaserId())
                            .status(historyShop.getStatus())
                            .userId(historyShop.getUserId())
                            .categoryId(historyShop.getCategoryId())
                            .categoryName(historyShop.getCategoryName())
                            .productId(historyShop.getProductId())
                            .address(historyShop.getAddress())
                            .build());
                });
            }

            return historyShopModels;
        }
        return new ArrayList<>();
    }
}

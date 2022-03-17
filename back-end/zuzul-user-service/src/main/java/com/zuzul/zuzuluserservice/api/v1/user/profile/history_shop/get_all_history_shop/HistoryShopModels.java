package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoryShopModels {
    private String historyId;
    private String userId; //shopId
    private String productName;
    private String productId;
    private String categoryId;
    private String categoryName;
    private long dateCreated;
    private String purchaserId;
    private int count;
    private int originPrice;
    private double discount;
    private String status;
    private String address;
}

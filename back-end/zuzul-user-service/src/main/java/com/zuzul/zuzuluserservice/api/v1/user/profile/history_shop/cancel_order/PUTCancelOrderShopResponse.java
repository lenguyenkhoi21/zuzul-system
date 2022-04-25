package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.cancel_order;

import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.HistoryShopModels;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTCancelOrderShopResponse {
    private String status;
    private List<HistoryShopModels> historyShopModelsList;
}

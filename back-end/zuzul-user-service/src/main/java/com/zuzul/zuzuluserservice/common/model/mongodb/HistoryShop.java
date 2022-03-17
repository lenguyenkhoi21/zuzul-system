package com.zuzul.zuzuluserservice.common.model.mongodb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HistoryShop {
    @Id
    private String id;

    private String historyId;
    private String userId; //shopId
    private String productId;
    private String categoryId;
    private String categoryName;
    private String productName;
    private long dateCreated;
    private String purchaserId;
    private int count;
    private int originPrice;
    private double discount;
    private String status;
    private String address;
}

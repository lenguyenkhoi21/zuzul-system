package com.zuzul.zuzuluserservice.common.model.mongodb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetails {
    @Id
    private String id;

    private String productName;
    private int count;
    private int originPrice;
    private int discount;
    private String sellerId;
    private String historyId;
    private String status;
}

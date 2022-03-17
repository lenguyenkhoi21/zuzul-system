package com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Details {
    private String productId;
    private String productName;
    private int count;
    private int originPrice;
    private int discount;
}

package com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductsModel {
    private String prdId;
    private int prdNumberInStorage;
}

package com.example.zuzulproductprivate.api.v1.user.product.change_prd_number_after_buying;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTChangeNumberInStoragePayload {
    List<Details> detailsList;
}

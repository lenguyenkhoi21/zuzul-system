package com.example.zuzulproductprivate.api.v1.pub.product.get_product_by_filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GETProductByFilterModel {
    private String prdId;
    private String prdName;
    private int prdPriceOrigin;
    private String prdImage;
    private String prdShortDes;
}

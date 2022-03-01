package com.example.zuzulproductprivate.api.v1.pub.product;

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
    private String prdUserId;
    private String prdName;
    private String prdCateId;
    private String prdSubId;
    private int prdPriceOrigin;
    private String currentImage;
    private int prdReact;
    private int prdNumberInStorage;
    private float prdSale;
    private String prdShortDes;
}

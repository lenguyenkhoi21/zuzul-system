package com.example.zuzulproductprivate.api.v1.user.product.get_product_user_by_id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETProductUserByIdResponse {
    private String prdId;
    private String prdUserId;
    private String prdName;
    private String prdCateId;
    private String prdSubId;
    private String prdCateName;
    private int prdPriceOrigin;
    private int prdReact;
    private int prdNumberInStorage;
    private float prdSale;
    private String prdShortDes;
    private String prdLongDes;
    private List<String> prdImages;
    private long prdDateCreate;
    private int discount;
    private String prdOrigin;
    private int prdMonthWarranty;
    private long prdDateManufacture;
}

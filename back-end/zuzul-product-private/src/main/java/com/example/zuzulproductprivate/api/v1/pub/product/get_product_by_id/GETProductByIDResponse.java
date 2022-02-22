package com.example.zuzulproductprivate.api.v1.pub.product.get_product_by_id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETProductByIDResponse {
    private String prdId;
    private String prdUserId;
    private String prdName;
    private String prdCateId;
    private String prdSubId;
    private int prdPriceOrigin;
    private String prdOrigin;
    private Date prdDateManufacture;
    private String prdShortDes;
    private String prdLongDes;
    private float prdSale;
    private List<String> prdImages;
    private String currentImage;
    private int prdReact;
    private String prdStatus;
    private Date prdDateCreate;
    private Date prdDateExpiry;
    private int prdMonthWarranty;
    private int prdNumberInStorage;
}

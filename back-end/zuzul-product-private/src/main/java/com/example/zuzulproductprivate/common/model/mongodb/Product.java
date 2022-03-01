package com.example.zuzulproductprivate.common.model.mongodb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@Data
@Builder
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    // 14 field
    @Id
    private String id;
    @Indexed(unique=true)
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
    private int discount;
}

package com.example.zuzulproductprivate.api.v1.user.product.post_create_new;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.util.Date;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payload {

    // User Post
    @NotEmpty
    private String prdUserId;

    // Product Name
    @NotEmpty
    private String prdName;

    // Category
    @NotEmpty
    private String prdCateId;

    // Sub Category
    @NotEmpty
    private String prdSubId;

    // Origin_price
    @Min(1)
    private int prdPriceOrigin;

    // From ? USA, CHINA, ??
    @NotEmpty
    private String prdOrigin;

    // Date manufacture
    private long prdDateManufacture;

    // Month warranty
    private int prdMonthWarranty;

    // Date that expiry
    private long prdDateExpiry;

    @NotEmpty
    private String prdShortDes;

    @NotEmpty
    private String prdLongDes;

    private float prdSale;

    @Min(1)
    private int prdNumberInStorage;
}

package com.example.zuzulproductprivate.api.v1.user.product.update_product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateProductPayload {

    @NotEmpty
    private String prdId;

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

    private int discount;

    private long prdDateCreate;
}

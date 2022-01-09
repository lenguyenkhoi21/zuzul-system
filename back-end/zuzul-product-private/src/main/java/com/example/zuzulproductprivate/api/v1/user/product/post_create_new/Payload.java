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
    private String prd_user_id;

    // Product Name
    @NotEmpty
    private String prd_name;

    // Category
    @NotEmpty
    private String prd_cate_id;

    // Sub Category
    @NotEmpty
    private String prd_sub_id;

    // Origin_price
    @Min(1)
    private int prd_price_origin;

    // From ? USA, CHINA, ??
    @NotEmpty
    private String prd_origin;

    // Date manufacture
    private long prd_date_manufacture;

    // Month warranty
    private int prd_month_warranty;

    // Date that expiry
    private long prd_date_expiry;

    @NotEmpty
    private String prd_short_des;

    @NotEmpty
    private String prd_long_des;

    private float prd_sale;
}

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
public class ProductModel {
    // 14 field
    @Id
    private String id;
    @Indexed(unique=true)
    private String prd_id;
    private String prd_user_id;
    private String prd_name;
    private String prd_cate_id;
    private String prd_sub_id;
    private int prd_price_origin;
    private String prd_origin;
    private Date prd_date_manufacture;
    private String prd_short_des;
    private String prd_long_des;
    private float prd_sale;
    private List<String> prd_images;
    private int prd_react;
    private String prd_status;
    private Date prd_date_create;
    private Date prd_date_expiry;
    private int prd_month_warranty;
}

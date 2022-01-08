package com.example.zuzulproductprivate.common.model.mongodb;

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
public class ProductModel {
    private String prd_id;
    private String prd_user_id;
    private String prd_name;
    private String cate_id;
    private String sub_id;
    private int prd_price_origin;
    private String prd_origin;
    private Date prd_date_manufacture;
    private String prd_short_des;
    private String prd_long_des;
    private float prd_sale;
    private List<String> prd_images;
    private int prd_react;
}

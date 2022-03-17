package com.example.zuzulproductprivate.api.v1.pub.subcategory.getAllSubByCate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryModel {
    private String subCategoryId;
    private String subCategoryName;
    private String subCategoryDescription;
}

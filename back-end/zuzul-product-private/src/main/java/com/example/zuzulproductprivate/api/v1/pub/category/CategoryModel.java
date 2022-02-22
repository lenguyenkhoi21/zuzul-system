package com.example.zuzulproductprivate.api.v1.pub.category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryModel {
    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
}

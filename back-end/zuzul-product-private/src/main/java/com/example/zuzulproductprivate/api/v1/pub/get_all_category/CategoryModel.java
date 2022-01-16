package com.example.zuzulproductprivate.api.v1.pub.get_all_category;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryModel {
    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
    private List<SubCategory> subCategoryList;
    private String status;
}

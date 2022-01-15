package com.example.zuzulproductprivate.api.v1.pub.get_all_category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GETAllCategoryResponse {
    List<CategoryModel> categoryList;
    String status;
}

package com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GETCategoryByIDResponse {
    private String categoryId;
    private String categoryName;
    private String categoryImage;
}

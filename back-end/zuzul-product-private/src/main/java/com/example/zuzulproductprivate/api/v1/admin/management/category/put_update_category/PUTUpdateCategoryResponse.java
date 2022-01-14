package com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateCategoryResponse {
    private String status;
    private boolean categoryImage;
}

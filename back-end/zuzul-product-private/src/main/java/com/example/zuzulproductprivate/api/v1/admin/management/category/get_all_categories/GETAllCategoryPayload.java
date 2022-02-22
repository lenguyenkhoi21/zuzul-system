package com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETAllCategoryPayload {
    private String userId;
}

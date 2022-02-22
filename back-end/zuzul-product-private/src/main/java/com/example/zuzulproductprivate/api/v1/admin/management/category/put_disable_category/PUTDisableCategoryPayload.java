package com.example.zuzulproductprivate.api.v1.admin.management.category.put_disable_category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PUTDisableCategoryPayload {
    private String categoryId;
    private String userId;
}

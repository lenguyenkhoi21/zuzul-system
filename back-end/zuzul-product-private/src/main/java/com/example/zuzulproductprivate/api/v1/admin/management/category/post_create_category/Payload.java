package com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payload {
    private String userId;
    private String categoryName;
    private String categoryDescription;
}

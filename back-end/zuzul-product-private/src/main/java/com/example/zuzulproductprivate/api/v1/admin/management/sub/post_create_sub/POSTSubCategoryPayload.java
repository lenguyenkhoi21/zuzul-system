package com.example.zuzulproductprivate.api.v1.admin.management.sub.post_create_sub;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class POSTSubCategoryPayload {
    private String userId;
    private String subCategoryName;
    private String subCategoryDescription;
    private String categoryId;
}

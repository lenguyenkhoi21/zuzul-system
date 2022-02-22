package com.example.zuzulproductprivate.api.v1.admin.management.sub.put_update_sub;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateSubCategoryPayload {
    private String subCategoryId;
    private String userId;
    private String subCategoryName;
    private String subCategoryDescription;
    private String categoryId;
}

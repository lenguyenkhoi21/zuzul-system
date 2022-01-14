package com.example.zuzulproductprivate.api.v1.admin.subcategory.put_disable_sub;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PUTDisableSubCategoryPayload {
    private String subCategoryId;
    private String userId;
    private String status;
}

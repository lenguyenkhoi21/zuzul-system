package com.example.zuzulproductprivate.api.v1.admin.management.sub.put_disable_sub;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTDisableSubCategoryPayload {
    private String userId;
    private String subCategoryId;
}

package com.example.zuzulproductprivate.api.v1.admin.subcategory.put_update_sub;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateSubCateogoryPayload {
    private String subCategoryId;
    private String userId;
    private String subCategoryName;
    private String subCategoryDescription;
    private String status;
}

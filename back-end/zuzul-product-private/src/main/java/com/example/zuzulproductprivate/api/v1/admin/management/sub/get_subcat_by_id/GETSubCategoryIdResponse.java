package com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETSubCategoryIdResponse {
    String subCategoryId;
    String subCategoryName;
}

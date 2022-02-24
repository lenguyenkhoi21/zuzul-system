package com.example.zuzulproductprivate.api.v1.admin.management.category.put_update_category;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateCategoryPayload {
    private String categoryId;
    private String userId;
    private String categoryName;
}

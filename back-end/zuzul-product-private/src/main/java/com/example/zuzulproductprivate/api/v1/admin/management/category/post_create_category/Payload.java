package com.example.zuzulproductprivate.api.v1.admin.management.category.post_create_category;

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
public class Payload {
    private String userId;
    private String categoryName;
    private String categoryDescription;
}

package com.example.zuzulproductprivate.common.model.mongodb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Document
public class SubCategory {
    @Id
    private String id;

    @Indexed(unique = true)
    private String subCategoryId;
    private String subCategoryName;
    private String subCategoryDescription;
    private String status;
}

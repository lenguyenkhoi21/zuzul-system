package com.example.zuzulproductprivate.common.model.mongodb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Category {
    @Id
    private String id;

    @Indexed(unique = true)
    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
    private List<SubCategory> subCategoryList;
    private String status;
}

package com.example.zuzulproductprivate.common.repo.mongodb;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubCategoryRepository extends MongoRepository<SubCategory, String> {
    SubCategory findSubCategoryBySubCategoryId(String id);
}

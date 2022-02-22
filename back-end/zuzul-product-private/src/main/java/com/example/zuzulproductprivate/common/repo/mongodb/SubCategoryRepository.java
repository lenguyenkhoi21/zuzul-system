package com.example.zuzulproductprivate.common.repo.mongodb;

import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SubCategoryRepository extends MongoRepository<SubCategory, String> {
    SubCategory findSubCategoryBySubCategoryId(String id);
    List<SubCategory> getAllByCategoryId(String id);
    List<SubCategory> getAllByCategoryIdAndStatus(String id, String status);
}

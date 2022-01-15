package com.example.zuzulproductprivate.common.repo.mongodb;

import com.example.zuzulproductprivate.common.model.mongodb.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    Category findCategoryByCategoryId(String id);
    List<Category> findAllByStatus(String status);
}

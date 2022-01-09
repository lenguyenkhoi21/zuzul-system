package com.example.zuzulproductprivate.common.repo.mongodb;

import com.example.zuzulproductprivate.common.model.mongodb.ProductModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<ProductModel, String> {
    ProductModel findByPrdId(String prdId);
}

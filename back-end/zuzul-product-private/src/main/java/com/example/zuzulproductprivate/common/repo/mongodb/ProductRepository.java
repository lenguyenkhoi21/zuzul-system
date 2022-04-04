package com.example.zuzulproductprivate.common.repo.mongodb;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    Product findByPrdId(String prdId);
    List<Product> findAllByPrdStatus(String status);
    List<Product> findAllByPrdCateIdAndPrdStatus(String id, String status);
    List<Product> findAllByPrdSubIdAndPrdStatus(String id, String status);
    List<Product> findAllByPrdUserId(String id);
}

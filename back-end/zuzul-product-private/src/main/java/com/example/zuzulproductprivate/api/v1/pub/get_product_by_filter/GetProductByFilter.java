package com.example.zuzulproductprivate.api.v1.pub.get_product_by_filter;

import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetProductByFilter {
    private final ProductRepository productRepository;
}

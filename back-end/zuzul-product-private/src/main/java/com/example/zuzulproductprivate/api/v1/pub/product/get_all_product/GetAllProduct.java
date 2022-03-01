package com.example.zuzulproductprivate.api.v1.pub.product.get_all_product;

import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllProduct {
    private final ProductRepository productRepository;

    public List<ProductsModel> getAllProducts () {
        List<Product> products = productRepository.findAllByPrdStatus("AVAILABLE");

        List<ProductsModel> productsModels = new ArrayList<>();

        products.forEach(product -> productsModels.add(ProductsModel
                .builder()
                .prdCateId(product.getPrdCateId())
                .prdId(product.getPrdId())
                .currentImage(product.getCurrentImage())
                .prdName(product.getPrdName())
                .prdNumberInStorage(product.getPrdNumberInStorage())
                .prdPriceOrigin(product.getPrdPriceOrigin())
                .prdReact(product.getPrdReact())
                .prdSale(product.getPrdSale())
                .prdSubId(product.getPrdSubId())
                .prdUserId(product.getPrdUserId())
                .prdShortDes(product.getPrdShortDes())
                .build()));

        return productsModels;
    }
}

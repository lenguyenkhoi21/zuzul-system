package com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_sub;

import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllProductBySub {
    private final ProductRepository productRepository;
    private final MongoTemplate mongoTemplate;

    /*public List<ProductsModel> getAllProductBySub (String subCategoryId) {
        List<Product> products = productRepository.findAllByPrdSubIdAndPrdStatus(subCategoryId, "AVAILABLE");

        List<ProductsModel> productsModels = new ArrayList<>();

        products.forEach(product -> productsModels.add(
                ProductsModel.builder()
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
                        .build()
        ));

        return productsModels;
    }*/

    public List<ProductsModel> getAllProductByMultipleSub (List<String> subCategoryIds, String categoryId) {
/*        if (subCategoryIds.isEmpty()) {
            List<Product> products = productRepository.findAllByPrdCateIdAndPrdStatus(categoryId, "AVAILABLE");

            List<ProductsModel> productsModels = new ArrayList<>();

            products.forEach(product -> productsModels.add(
                    ProductsModel.builder()
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
                            .build()));

            return productsModels;
        }*/

        List<Criteria> criteriaList = new ArrayList<>();
        subCategoryIds.forEach(subCategoryId -> {
            Criteria criteria = Criteria
                    .where("prdSubId").is(subCategoryId)
                    .and("prdStatus").is("AVAILABLE");
            criteriaList.add(criteria);
        });

        Criteria mainCriteria = new Criteria();

        mainCriteria.orOperator(criteriaList.toArray(new Criteria[criteriaList.size()]));

        Query query = new Query(mainCriteria);
        query.with(Sort.by(Sort.Direction.DESC, "prdDateCreate"));

        List<Product> products = mongoTemplate.find(query, Product.class);

        List<ProductsModel> productsModels = new ArrayList<>();

        products.forEach(product -> productsModels.add(
                ProductsModel.builder()
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
                        .build()
        ));

        return productsModels;
    }
}

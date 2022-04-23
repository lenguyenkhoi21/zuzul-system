package com.example.zuzulproductprivate.api.v1.pub.product.filter_product;

import com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product.ProductsHandle;
import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.common.adminclient.AdminClient;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.ultis.Constant;
import com.example.zuzulproductprivate.common.usercontext.UserContext;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilterProduct {
    private final ProductRepository productRepository;

    @CircuitBreaker(name = "userService")
    @RateLimiter(name = "userService")
    @Retry(name = "retryUserService")
    @Bulkhead(name = "bulkheadUserService", type = Bulkhead.Type.THREADPOOL)
    public List<ProductsModel> searchProduct (String type, String query) {
        List<ProductsModel> productsModels = new ArrayList<>();
        if (type.equals("NAME")) {
            List<Product> products = productRepository.findAllByPrdNameFilter(query);

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

        if (type.equals("USER")) {
            List<Product> products = new ArrayList<>();
            List<String> userIds = getUserIDs(query);
            userIds.forEach(userId -> {
                List<Product> filterProduct = productRepository.findAllByPrdUserId(userId);

                products.addAll(filterProduct);
            });

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
                            .prdShortDes(product.getPrdShortDes())
                            .build()
            ));

            return productsModels;
        }
        return new ArrayList<>();
    }

    private final AdminClient adminClient;

    @Autowired
    @Qualifier(Constant.LOAD_BALANCED_BEAN)
    private RestTemplate restTemplate;

    private List<String> getUserIDs (String query) {
        String correlationId = UserContext.getCorrelationId();

        String url = "http://zuzul-user-service/zuzul-user-service/v1/user/69e77a1e-d7b0-4ae5-bf96-6c93af207c4d/shop/{query}";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(UserContext.CORRELATION_ID, correlationId);
        httpHeaders.add("Authorization", "Bearer " + adminClient.getToken().getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        ResponseEntity<Response> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                Response.class,
                query
        );

        List<UserModel> userModels = responseEntity.getBody().getUserModels();
        List<String> userIds = new ArrayList<>();
        userModels.forEach(userModel -> {
            userIds.add(userModel.getUserId());
        });

        return userIds;
    }
}

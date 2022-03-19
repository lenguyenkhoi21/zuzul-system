package com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product;

import com.example.zuzulproductprivate.common.adminclient.AdminClient;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import com.example.zuzulproductprivate.common.ultis.Constant;
import com.example.zuzulproductprivate.common.usercontext.UserContext;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllRegisteredProduct {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final AdminClient adminClient;

    @Autowired
    @Qualifier(Constant.LOAD_BALANCED_BEAN)
    private RestTemplate restTemplate;

    @CircuitBreaker(name = "userService")
    @RateLimiter(name = "userService")
    @Retry(name = "retryUserService")
    @Bulkhead(name = "bulkheadUserService", type = Bulkhead.Type.THREADPOOL)
    public List<ProductsModel> getAllRegisteredProduct (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<Product> products = productRepository.findAllByPrdStatus("WAITING_FOR_ACCEPT");

            List<String> userIds = new ArrayList<>();

            products.forEach(product -> {
                userIds.add(product.getPrdUserId());
            });

            //Call Microservice zuzul-user-service
            String correlationId = UserContext.getCorrelationId();

            String url = "http://zuzul-user-service/zuzul-user-service/v1/user/userInfoByPrd/{adminId}";

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.put("Content-Type",  Arrays.asList("application/json"));
            httpHeaders.add(UserContext.CORRELATION_ID, correlationId);
            httpHeaders.add("Authorization", "Bearer " + adminClient.getToken().getAccess_token());
            HttpEntity<List<String>> entity = new HttpEntity<>((List<String>) userIds, httpHeaders);

            ResponseEntity<ProductsHandle> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    ProductsHandle.class,
                    userId
            );
/*
            ProductsHandle productsHandle = ProductsHandle
                    .builder()
                    .userShopNames(responseEntity.getBody().getUserShopNames())
                    .build();*/

            List<String> userShopName =  responseEntity.getBody().getUserShopNames();

            List<ProductsModel> productsModels = new ArrayList<>();

            for (int i = 0; i < products.size(); i++) {
                productsModels.add(ProductsModel
                        .builder()
                        .userShopName(userShopName.get(i))
                        .categoryName(categoryRepository
                                .findCategoryByCategoryId(
                                        products.get(i).getPrdCateId())
                                .getCategoryName())
                        .subCategoryName(subCategoryRepository
                                .findSubCategoryBySubCategoryId(
                                        products.get(i).getPrdSubId())
                                .getSubCategoryName())
                        .count(products.get(i).getPrdNumberInStorage())
                        .prdDateCreate(products.get(i).getPrdDateCreate())
                        .userId(products.get(i).getPrdUserId())
                        .productName(products.get(i).getPrdName())
                        .productId(products.get(i).getPrdId())
                        .build());
            }

            return productsModels;
        }
        return new ArrayList<>();
    }
}

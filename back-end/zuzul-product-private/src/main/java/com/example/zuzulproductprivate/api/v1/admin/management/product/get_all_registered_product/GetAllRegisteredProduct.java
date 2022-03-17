package com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import com.example.zuzulproductprivate.common.ultis.Constant;
import com.example.zuzulproductprivate.common.usercontext.UserContext;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllRegisteredProduct {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    //@Qualifier(Constant.LOAD_BALANCED_BEAN)
    private RestTemplate restTemplate;

    public List<ProductsModel> getAllRegisteredProduct (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<Product> products = productRepository.findAllByPrdStatus("WAITING_FOR_ACCEPT");

            List<String> userIds = new ArrayList<>();

            products.forEach(product -> {
                userIds.add(product.getPrdUserId());
            });

            //Call Microservice zuzul-user-service
            String correlationId = UserContext.getCorrelationId();

            String url = "http://zuzul-user-service/v1/user/userInfoByPrd";

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(UserContext.CORRELATION_ID, correlationId);
            HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

            ResponseEntity<ProductsHandle> responseEntity = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    ProductsHandle.class,
                    userIds
            );

            ProductsHandle productsHandle = ProductsHandle
                    .builder()
                    .userShopNames(responseEntity.getBody().getUserShopNames())
                    .build();

            List<ProductsModel> productsModels = new ArrayList<>();

            for (int i = 0; i < products.size(); i++) {
                productsModels.add(ProductsModel
                        .builder()
                        .userShopName(productsHandle.getUserShopNames().get(i))
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
                        .build());
            }

            return productsModels;
        }
        return new ArrayList<>();
    }
}

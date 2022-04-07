package com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items;

import com.zuzul.zuzuluserservice.api.v1.user.cart.CartModel;
import com.zuzul.zuzuluserservice.api.v1.user.cart.CartResponse;
import com.zuzul.zuzuluserservice.common.adminclient.AdminClient;
import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import com.zuzul.zuzuluserservice.common.usercontext.UserContext;
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

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllItems {
    private final CartRepository cartRepository;
    private final AdminClient adminClient;

    @Autowired
    @Qualifier(Constant.LOAD_BALANCED_BEAN)
    private RestTemplate restTemplate;

    @CircuitBreaker(name = "productService")
    @RateLimiter(name = "productService")
    @Retry(name = "retryProductService")
    @Bulkhead(name = "bulkheadProductService", type = Bulkhead.Type.THREADPOOL)
    public CartResponse getAllItemsInCart (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            List<Cart> items = cartRepository.findAllByPurchaserId(userId);

            List<CartModel> cartModels = new ArrayList<>();

            items.forEach(item -> {
                ProductsModel productsModel = getModels(item.getProductId());

                cartModels.add(
                        CartModel
                                .builder()
                                .count(item.getCount())
                                .sellerId(item.getSellerId())
                                .productId(item.getProductId())
                                .purchaserId(item.getPurchaserId())
                                .productName(productsModel.getPrdName())
                                .originPrice(productsModel.getPrdPriceOrigin())
                                .discount(productsModel.getDiscount())
                                .build()
                );
            });

            long totalMoney = 0;

            for (CartModel cartModel : cartModels) {
                totalMoney += (cartModel.getCount() * cartModel.getOriginPrice()) -
                         (cartModel.getCount() * cartModel.getOriginPrice() * cartModel.getDiscount() / 100);
            }

            return CartResponse
                    .builder()
                    .cartModelList(cartModels)
                    .alert(false)
                    .totalMoney(totalMoney)
                    .build();
        }

        return CartResponse.builder().build();
    }

    private ProductsModel getModels (String productId) {
        String correlation_id = UserContext.getCorrelationId();
        // Name In Eureka Server (localhost:8888 to loadBalanced)
        String url = "http://zuzul-product-private/zuzul-product-private/v1/pub/product/{product}";

        HttpHeaders headers = new HttpHeaders();
        headers.add(UserContext.CORRELATION_ID, correlation_id);
        headers.add("Authorization", "Bearer " + adminClient.getToken().getAccess_token());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<ProductsModel> restExchange = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                ProductsModel.class,
                productId);

        return ProductsModel
                .builder()
                .prdName(restExchange.getBody().getPrdName())
                .prdPriceOrigin(restExchange.getBody().getPrdPriceOrigin())
                .discount(restExchange.getBody().getDiscount())
                .build();
    }
}

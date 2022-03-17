package com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zuzul.zuzuluserservice.common.adminclient.AdminClient;
import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import com.zuzul.zuzuluserservice.common.model.mongodb.HistoryShop;
import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import com.zuzul.zuzuluserservice.common.repo.mongodb.*;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import com.zuzul.zuzuluserservice.common.ultis.FunctionalUtils;
import com.zuzul.zuzuluserservice.common.usercontext.UserContext;
import io.github.resilience4j.bulkhead.annotation.Bulkhead;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CreateHistory {
    private final HistoryRepository historyRepository;
    private final CartRepository cartRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final HistoryShopRepository historyShopRepository;
    private final Logger logger = LoggerFactory.getLogger(CreateHistory.class);
    private final AdminClient adminClient;
    private final DiscoveryClient discoveryClient;
    private final ObjectMapper objectMapper;

    @Autowired
    @Qualifier(Constant.LOAD_BALANCED_BEAN)
    private RestTemplate restTemplate;

    // Add CircuitBreaker
    @CircuitBreaker(name = "productService")
    @RateLimiter(name = "productService")
    @Retry(name = "retryProductService")
    @Bulkhead(name = "bulkheadProductService", type = Bulkhead.Type.THREADPOOL)
    public POSTCreateHistoryResponse createHistory (POSTCreateHistoryPayload payload, Principal principal) throws JsonProcessingException {
        discoveryClient.getInstances("zuzul-product-private").forEach(serviceInstance -> {
            logger.info("Instance: {}" ,serviceInstance);
        });
        if (principal.getName().equals(payload.getUserId())) {
            List<Details> details = payload.getDetailsList();
            //TODO Handle Logic
            List<ProductsModel> productsModels = new ArrayList<>();

            details.forEach(detail -> {
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
                        detail.getProductId());


                productsModels.add(ProductsModel
                        .builder()
                        .prdId(restExchange.getBody().getPrdId())
                        .prdNumberInStorage(restExchange.getBody().getPrdNumberInStorage())
                        .build());
                logger.info(String.valueOf(restExchange.getBody()));
            });

            //Data get from FE

            List<Details> modifiedList = new ArrayList<>();

            List<Details> finalList = new ArrayList<>();

            for (int i = 0; i < details.size(); i++) {
                if (details.get(i).getCount() > productsModels.get(i).getPrdNumberInStorage()) {
                    modifiedList.add(details.get(i));
                }
            }
            //Prevent create history if product count is lower than one in database

            String historyId = FunctionalUtils.generateHistoryID();

            Timestamp timestamp = new Timestamp(System.currentTimeMillis());

            if (modifiedList.size() != 0) finalList = modifiedList;
            else finalList = details;

            int newSize = finalList.size();

            int totalPrice = 0;

            for (int i = 0; i < newSize; i++) {
                orderDetailsRepository.save(OrderDetails
                        .builder()
                        .historyId(historyId)
                        .productName(finalList.get(i).getProductName())
                        .discount(finalList.get(i).getDiscount())
                        .count(finalList.get(i).getCount())
                        .originPrice(finalList.get(i).getOriginPrice())
                        .status("WAIT FOR ACCEPTANCE")
                        .build());

                historyShopRepository.save(HistoryShop
                        .builder()
                        .historyId(historyId)
                        .userId(cartRepository.findCartByPurchaserIdAndProductId(
                                payload.getUserId(),
                                details.get(i).getProductId())
                                .getSellerId())
                        .productName(finalList.get(i).getProductName())
                        .discount(finalList.get(i).getDiscount())
                        .count(finalList.get(i).getCount())
                        .originPrice(finalList.get(i).getOriginPrice())
                        .dateCreated(payload.getDateCreated())
                        .purchaserId(payload.getUserId())
                        .status("WAIT")
                        .build());

                totalPrice += (finalList.get(i).getOriginPrice() * finalList.get(i).getCount())
                        - (finalList.get(i).getOriginPrice() * finalList.get(i).getCount() * finalList.get(i).getDiscount() / 100);

                //Remove product from cart after payment
                cartRepository.deleteCartByPurchaserIdAndProductId(payload.getUserId(), details.get(i).getProductId());
            }

            if (callChangeNumberInStorage(payload.getUserId(), finalList)) {
                History history = History
                        .builder()
                        .dateCreated(payload.getDateCreated())
                        .historyId(historyId)
                        .totalPrice(totalPrice)
                        .userId(payload.getUserId())
                        .address(payload.getAddress())
                        .phone(payload.getPhone())
                        .paymentType(payload.getPaymentType())
                        .build();

                historyRepository.save(history);
            }


            return POSTCreateHistoryResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }

        return POSTCreateHistoryResponse
                .builder()
                .status("FAIL")
                .build();
    }

    private boolean callChangeNumberInStorage (String userId, List<Details> detailsList) throws JsonProcessingException {
        String correlation_id = UserContext.getCorrelationId();
        // Name In Eureka Server (localhost:8888 to loadBalanced)
        String url = "http://zuzul-product-private/zuzul-product-private/v1/user/product/{userId}/changeNumberInStorage";

     /*   MultiValueMap<String, List<Details>> mapping = new LinkedMultiValueMap<>();
        mapping.add("detailsList", details);*/

        HttpHeaders headers = new HttpHeaders();
        headers.put("Content-Type",  Arrays.asList("application/json"));
        headers.add(UserContext.CORRELATION_ID, correlation_id);
        headers.add("Authorization", "Bearer " + adminClient.getToken().getAccess_token());
        HttpEntity<List<Details>> entity = new HttpEntity<>(detailsList, headers);

        ResponseEntity<String> restExchange = restTemplate.exchange(
                url,
                HttpMethod.PUT,
                entity,
                String.class,
                userId);

        if (restExchange.getBody().equals("SUCCESS"))
            return true;
        return false;
    }
}

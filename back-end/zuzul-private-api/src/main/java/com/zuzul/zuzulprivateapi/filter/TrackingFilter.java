package com.zuzul.zuzulprivateapi.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Order(1)
@Component
public class TrackingFilter implements GlobalFilter {
    private final FilterUtils filterUtils;

    private static final Logger logger = LoggerFactory.getLogger(TrackingFilter.class);

    public TrackingFilter(FilterUtils filterUtils) {
        this.filterUtils = filterUtils;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        HttpHeaders requestHeaders = exchange.getRequest().getHeaders();
        String correlationID = filterUtils.getCorrelationId(requestHeaders);

        ServerHttpRequest mutatedRequest1 = exchange.getRequest().mutate().header(HttpHeaders.ORIGIN).build();
        ServerHttpRequest mutatedRequest2= exchange.getRequest().mutate().header(HttpHeaders.REFERER).build();

        exchange.mutate()
                .request(mutatedRequest1)
                .request(mutatedRequest2)
                .build();

        if (correlationID != null) {
            logger.info(
                    "tmx-correlation-id found in tracking filter: {}. ",
                    filterUtils.getCorrelationId(requestHeaders));
        } else {
            correlationID = generateCorrelationId();
            logger.info(
                    "tmx-correlation-id not found in tracking filter, create one: {}. ",
                    correlationID);
        }

        String authenticationBearer;
        try {
            authenticationBearer = filterUtils.getAuthorization(requestHeaders);
            if (authenticationBearer == null) {
                logger.info("No Auth Token, Rejected !");
                throw new Exception();
            };

            filterUtils.setCorrelationIDHeader(exchange,
                    FilterUtils.CORRELATION_ID,
                    correlationID
            );

            return chain.filter(exchange);
        } catch (Exception e) {
           return Mono.empty();
        }
    }

    private String generateCorrelationId() {
        return java.util.UUID.randomUUID().toString();
    }
}

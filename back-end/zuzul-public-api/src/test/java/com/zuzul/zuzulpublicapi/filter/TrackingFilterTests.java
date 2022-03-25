package com.zuzul.zuzulpublicapi.filter;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.CoreSubscriber;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;

public class TrackingFilterTests {
    FilterUtils utils = new FilterUtils();
    TrackingFilter trackingFilter = new TrackingFilter(utils) ;
    @Test
    void testFilter(){
        MockServerHttpRequest request = MockServerHttpRequest.get("https://google.com").build();
        ServerWebExchange exchange = MockServerWebExchange.from(request);
        GatewayFilterChain gate= mock(GatewayFilterChain.class);
        Mockito.when(gate.filter(any(ServerWebExchange.class))).thenReturn(Mono.empty());
        Assertions.assertEquals(trackingFilter.filter(exchange,gate),Mono.empty());
        Assertions.assertNotNull(exchange.getRequest().getHeaders().get(FilterUtils.CORRELATION_ID).get(0));
    }

}

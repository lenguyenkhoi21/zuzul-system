package com.zuzul.zuzulpublicapi.filter;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.i18n.LocaleContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.codec.multipart.Part;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.util.MultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;


public class FilterUtilsTests {
    FilterUtils utils = new FilterUtils();

@Test
    void testGetCorrelationIdNotNull(){
    HttpHeaders headers = new HttpHeaders();
    List<String> correlIds = new ArrayList<>();
    correlIds.add("abcdef");
    headers.put(FilterUtils.CORRELATION_ID, correlIds);

    Assertions.assertEquals(utils.getCorrelationId(headers), "abcdef");
}
    @Test
    void testGetCorrelationIdNull(){
        HttpHeaders headers = new HttpHeaders();
        Assertions.assertNull(utils.getCorrelationId(headers));
    }
    @Test
    void testSetCorrelationId(){
        MockServerHttpRequest request = MockServerHttpRequest.get("https://google.com").build();
        ServerWebExchange exchange = MockServerWebExchange.from(request);
        ServerWebExchange newExchange = utils.setCorrelationId(exchange, "123456");
        Assertions.assertEquals(utils.getCorrelationId(newExchange.getRequest().getHeaders()), "123456");
    }
    @Test
    void testSetRequestHeader(){
        MockServerHttpRequest request = MockServerHttpRequest.get("https://google.com").build();
        ServerWebExchange exchange = MockServerWebExchange.from(request);
        ServerWebExchange newExchange = utils.setRequestHeader(exchange,"abcdef","123456");
        Assertions.assertEquals(newExchange.getRequest().getHeaders().get("abcdef").get(0),"123456");
    }
}

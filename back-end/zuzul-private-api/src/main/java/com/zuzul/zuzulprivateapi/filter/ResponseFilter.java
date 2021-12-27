package com.zuzul.zuzulprivateapi.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import reactor.core.publisher.Mono;

@Configuration
public class ResponseFilter {
    private static final Logger logger = LoggerFactory.getLogger(ResponseFilter.class);

    @Bean
    public GlobalFilter postGlobalFilter() {
        return (exchange, chain) ->
                chain.filter(exchange)
                     .then(Mono.fromRunnable(() -> {
                         String CORRELATION_ID = exchange
                                 .getRequest()
                                 .getHeaders()
                                 .get(FilterUtils.CORRELATION_ID)
                                 .stream()
                                 .findFirst()
                                 .get();

                         exchange
                                 .getResponse()
                                 .getHeaders()
                                 .add(FilterUtils.CORRELATION_ID, CORRELATION_ID);

                         logger.info("Completing outgoing request for {}.", exchange.getRequest().getURI());
                     }));
    }
}

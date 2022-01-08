package com.zuzul.zuzulprivateapi.filter;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import java.util.List;

@Component
public class FilterUtils {
    public static final String CORRELATION_ID = "tmx-correlation-id";
    public static final String AUTH_TOKEN     = "Authorization";

    // Get CorrelationId
    public String getCorrelationId(HttpHeaders requestHeaders){
        if (requestHeaders.get(CORRELATION_ID) != null) {
            List<String> header = requestHeaders.get(CORRELATION_ID);
            return header.stream().findFirst().get();
        }
        else{
            return null;
        }
    }

    // Get Authorization Header
    public String getAuthorization(HttpHeaders requestHeaders){
        if (requestHeaders.get(AUTH_TOKEN) != null) {
            List<String> header = requestHeaders.get(AUTH_TOKEN);
            return header.stream().findFirst().get();
        }
        else{
            return null;
        }
    }

    public ServerWebExchange setRequestHeader(ServerWebExchange exchange,
                                              String correlationHeader,
                                              String correlationValue,
                                              String authenticationHeader,
                                              String authenticationValue) {
        return exchange.mutate()
                       .request(
                               exchange
                                       .getRequest()
                                       .mutate()
                                       .header(correlationHeader, correlationValue)
                                       .header(authenticationHeader, authenticationValue)
                                       .build()
                       )
                       .build();
    }

    public ServerWebExchange setCorrelationIDHeader(ServerWebExchange exchange,
                                              String correlationHeader,
                                              String correlationValue) {
        return exchange.mutate()
                       .request(
                               exchange
                                       .getRequest()
                                       .mutate()
                                       .header(correlationHeader, correlationValue)
                                       .build()
                       )
                       .build();
    }
}

package com.example.zuzulproductprivate.common.usercontext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static com.example.zuzulproductprivate.common.usercontext.UserContext.AUTH_TOKEN;
import static com.example.zuzulproductprivate.common.usercontext.UserContext.CORRELATION_ID;

@Component
public class UserContextFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(UserContextFilter.class);

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String traceId = httpServletRequest.getHeader(CORRELATION_ID);
        String auth_token = httpServletRequest.getHeader(AUTH_TOKEN);
        UserContext.setCorrelationId(traceId);
        logger.info("UserContextFilter Correlation id: {}", UserContext.getCorrelationId());
        logger.info("UserContextFilter auth_token: {}", auth_token);
        chain.doFilter(httpServletRequest, response);
    }
}

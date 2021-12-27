package com.zuzul.zuzulchatservice.common.usercontext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class UserContextFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(UserContextFilter.class);

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String traceId = httpServletRequest.getHeader("tmx-correlation-id");
        UserContext.setCorrelationId(traceId);
        logger.debug("UserContextFilter Correlation id: {}", UserContext.getCorrelationId());
        chain.doFilter(httpServletRequest, response);
    }
}

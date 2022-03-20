package com.example.zuzulproductprivate.common.config;

import com.example.zuzulproductprivate.common.ultis.Constant;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class LoadBalancedBean {
    @Bean(name = Constant.LOAD_BALANCED_BEAN)
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}

package com.zuzul.zuzuluserservice.common.config;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import org.apache.tomcat.util.bcel.Const;
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

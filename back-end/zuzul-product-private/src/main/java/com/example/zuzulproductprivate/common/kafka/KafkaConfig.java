package com.example.zuzulproductprivate.common.kafka;

import com.example.zuzulproductprivate.common.model.kafka.Notify;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class KafkaConfig {
    private final Kafka kafka;

    @Bean
    public Map<String, Object> properties() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafka.getBootstrapAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return config;
    }

    @Bean
    public ProducerFactory<String, Notify> producerFactoryNotify() {
        return new DefaultKafkaProducerFactory<>(properties());
    }

    @Bean(name = Constant.KAFKA_TOPIC_NOTIFY_TO_COMMUNITY_SERVICES)
    public KafkaTemplate<String, Notify>  kafkaTemplateNotify() {
        return new KafkaTemplate<String, Notify>(producerFactoryNotify());
    }
}

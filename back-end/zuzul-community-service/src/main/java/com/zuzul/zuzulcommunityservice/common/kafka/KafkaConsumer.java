package com.zuzul.zuzulcommunityservice.common.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zuzul.zuzulcommunityservice.common.model.cassandra.NotifyByUser;
import com.zuzul.zuzulcommunityservice.common.model.cassandra.NotifyByUserKey;
import com.zuzul.zuzulcommunityservice.common.model.kafka.Notify;
import com.zuzul.zuzulcommunityservice.common.ultis.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;

@EnableKafka
@Configuration
public class KafkaConsumer {
    private final Logger logger = LoggerFactory.getLogger(KafkaConsumer.class);


    @KafkaListener(topics = Constant.KAFKA_TOPIC_NOTIFY_TO_COMMUNITY_SERVICES,
            groupId = Constant.KAFKA_GROUP_ID_1)
    public void consume1(String message) {
        ObjectMapper mapper = new ObjectMapper();
        Notify notify = null;
        try {
            notify = mapper.readValue(message, Notify.class);

            NotifyByUserKey key = NotifyByUserKey
                    .builder()
                    .userId(notify.getUserId())
                    .notificationPublishDate(notify.getNotificationPublishDate())
                    .build();

            NotifyByUser notifyByUser = NotifyByUser
                    .builder()
                    .key(key)
                    .notificationContent(notify.getNotificationContent())
                    .notificationStatus(notify.getNotificationStatus())
                    .notificationType(notify.getNotificationType())
                    .build();



            logger.info("Success processing");
        } catch (Exception ignored) {
            logger.info("Error processing");
        }
    }
}

package com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng;

import com.example.zuzulproductprivate.common.model.kafka.Notify;
import com.example.zuzulproductprivate.common.model.mongodb.Product;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UpdatePrd {

    @Autowired
    @Qualifier(Constant.KAFKA_TOPIC_NOTIFY_TO_COMMUNITY_SERVICES)
    private KafkaTemplate<String, Notify> notifyKafkaTemplate;

    private final ProductRepository productRepository;

    public Response updateProduct(Payload payload) {
        Product productAccept = productRepository.findByPrdId(payload.getPrdId());
        productAccept.setPrdStatus("AVAILABLE");
        productRepository.save(productAccept);
        // TODO: Call to Relationship-Service to get who follow this person
        // TODO: Call to User-Service to get name of shop
        // Dummy data here
        List<String> whoFollows = new ArrayList<>();
        whoFollows.add("user-01");
        whoFollows.add("user-02");
        whoFollows.add("user-03");
        whoFollows.add("user-04");

        whoFollows.forEach(user -> {
            String notificationContent = "Shop " + user + " bạn theo dõi đã đăng sản phẩm mới mới !";
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            notifyKafkaTemplate.send(Constant.KAFKA_TOPIC_NOTIFY_TO_COMMUNITY_SERVICES,
                    Notify.builder()
                          .userId(user)
                          .notificationPublishDate(timestamp.getTime())
                          .notificationContent(notificationContent)
                          .notificationType("CENSORSHIP")
                          .notificationStatus("UNREAD")
                          .build());
        });

        return Response.builder()
                       .status("Success")
                       .build();
    }
}

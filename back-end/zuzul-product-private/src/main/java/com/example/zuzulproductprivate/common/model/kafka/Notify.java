package com.example.zuzulproductprivate.common.model.kafka;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notify {
    private String userId;
    private String notificationContent;
    private long notificationPublishDate;
    private String notificationType;
    @Builder.Default
    private String notificationStatus = "UNREAD";
}

package com.zuzul.zuzulcommunityservice.common.model.cassandra;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Data
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotifyByUser {
    @PrimaryKey
    private NotifyByUserKey key;

    private String notificationType;

    private String notificationContent;

    private String notificationStatus;
}

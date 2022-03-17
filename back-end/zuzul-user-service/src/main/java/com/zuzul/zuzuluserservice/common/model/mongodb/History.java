package com.zuzul.zuzuluserservice.common.model.mongodb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class History {
    @Id
    private String id;

    @Indexed(unique = true)
    private String historyId;

    private String userId;
    private long dateCreated;
    private int totalPrice;
    private String userName;
    private String paymentType;
    private String address;
    private String phone;
}


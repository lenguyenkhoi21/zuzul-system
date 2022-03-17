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
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    private String id;

    @Indexed(unique = true)
    private String addressId;
    private String userName;
    private String userPhone;
    private String userWard;
    private String userDistinct;
    private String userCity;
    private String detailsAddress;
    private String userId;
    private boolean type;
}

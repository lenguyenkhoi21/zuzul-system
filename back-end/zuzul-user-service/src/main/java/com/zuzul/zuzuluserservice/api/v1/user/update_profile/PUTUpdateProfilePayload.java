package com.zuzul.zuzuluserservice.api.v1.user.update_profile;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateProfilePayload {
    private String userId;
    private String userFirstName;
    private String userLastName;
    private String userPhone;
    private long userBirthDay;
    private String userSex;
}

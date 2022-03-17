package com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateProfilePayload {
    private String userId;
    private String userFullName;
    private String userPhone;
    private long userBirthday;
    private String userSex;
    private String userEmail;
    private String userName;
}

package com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETUserInfoByIdResponse {
    private String userId;
    private String userFullName;
    private String userPhone;
    private long userBirthday;
    private String userSex;
    private String currentAvatar;
    private String currentCover;
    private boolean userActivated;
    private String userShopName;
    private String userName;
    private String userEmail;
}

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
public class UserInfo {
    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;
    private String userName;
    private String userFullName;
    private String userPhone;
    private long userBirthDay;
    private String userSex;
    private String userEmail;
    private List<String> userCoverPhotos;
    private List<String> userAvatarPhotos;
    private String currentAvatar;
    private String currentCover;
    @Builder.Default
    private boolean userActivated = false;
    @Builder.Default
    private String userShopName = "";
    @Builder.Default
    private boolean sendRequest = false;
    private long sendRequestDate;
}

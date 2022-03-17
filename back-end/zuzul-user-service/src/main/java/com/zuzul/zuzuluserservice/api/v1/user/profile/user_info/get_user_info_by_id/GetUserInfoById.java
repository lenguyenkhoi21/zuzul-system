package com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_id;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class GetUserInfoById {
    private final UserInfoRepository userInfoRepository;

    public GETUserInfoByIdResponse getUserInfoById (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            UserInfo userInfo = userInfoRepository.findUserInfoByUserId(userId);

            return GETUserInfoByIdResponse
                    .builder()
                    .currentAvatar(userInfo.getCurrentAvatar())
                    .currentCover(userInfo.getCurrentCover())
                    .userBirthday(userInfo.getUserBirthDay())
                    .userId(userInfo.getUserId())
                    .userActivated(userInfo.isUserActivated())
                    .userName(userInfo.getUserName())
                    .userFullName(userInfo.getUserFullName())
                    .userPhone(userInfo.getUserPhone())
                    .userSex(userInfo.getUserSex())
                    .userShopName(userInfo.getUserShopName())
                    .userEmail(userInfo.getUserEmail())
                    .build();
        }
        return GETUserInfoByIdResponse
                .builder()
                .build();
    }
}

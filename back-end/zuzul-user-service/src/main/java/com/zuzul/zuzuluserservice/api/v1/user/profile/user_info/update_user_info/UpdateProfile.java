package com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class UpdateProfile {
    private final UserInfoRepository userInfoRepository;

    public PUTUpdateProfileResponse updateProfile (PUTUpdateProfilePayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            UserInfo userInfo = userInfoRepository.findUserInfoByUserId(payload.getUserId());

            if (userInfo != null) {
                UserInfo updatedUserInfo = UserInfo
                        .builder()
                        .id(userInfo.getId())
                        .userId(userInfo.getUserId())
                        .userBirthDay(payload.getUserBirthday())
                        .userFullName(payload.getUserFullName())
                        .userPhone(payload.getUserPhone())
                        .userSex(payload.getUserSex())
                        .userAvatarPhotos(userInfo.getUserAvatarPhotos())
                        .userCoverPhotos(userInfo.getUserCoverPhotos())
                        .userActivated(userInfo.isUserActivated())
                        .userShopName(userInfo.getUserShopName())
                        .userEmail(payload.getUserEmail())
                        .currentAvatar("")
                        .currentCover("")
                        .userName(userInfo.getUserName())
                        .build();

                userInfoRepository.save(updatedUserInfo);

                return PUTUpdateProfileResponse
                        .builder()
                        .status("SUCCESS")
                        .build();
            }
            else {
                UserInfo newUserInfo = UserInfo
                        .builder()
                        .userId(payload.getUserId())
                        .userBirthDay(payload.getUserBirthday())
                        .userFullName(payload.getUserFullName())
                        .userPhone(payload.getUserPhone())
                        .userSex(payload.getUserSex())
                        .userAvatarPhotos(new ArrayList<>())
                        .userCoverPhotos(new ArrayList<>())
                        .userActivated(false)
                        .userShopName("")
                        .currentAvatar("")
                        .currentCover("")
                        .userEmail(payload.getUserEmail())
                        .userName(payload.getUserName())
                        .build();

                userInfoRepository.save(newUserInfo);

                return PUTUpdateProfileResponse
                        .builder()
                        .status("SUCCESS")
                        .build();
            }
        }
        return PUTUpdateProfileResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

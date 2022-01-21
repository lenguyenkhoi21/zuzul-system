package com.zuzul.zuzuluserservice.api.v1.user.update_profile;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
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
                        .userBirthDay(userInfo.getUserBirthDay())
                        .userFirstName(userInfo.getUserFirstName())
                        .userLastName(userInfo.getUserLastName())
                        .userPhone(userInfo.getUserPhone())
                        .userSex(userInfo.getUserSex())
                        .userAvatarPhotos(userInfo.getUserAvatarPhotos())
                        .userCoverPhotos(userInfo.getUserCoverPhotos())
                        .userActivated(userInfo.isUserActivated())
                        .userShopName(userInfo.getUserShopName())
                        .currentAvatar("")
                        .currentCover("")
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
                        .userBirthDay(payload.getUserBirthDay())
                        .userFirstName(payload.getUserFirstName())
                        .userLastName(payload.getUserLastName())
                        .userPhone(payload.getUserPhone())
                        .userSex(payload.getUserSex())
                        .userAvatarPhotos(new ArrayList<>())
                        .userCoverPhotos(new ArrayList<>())
                        .userActivated(false)
                        .userShopName("")
                        .currentAvatar("")
                        .currentCover("")
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

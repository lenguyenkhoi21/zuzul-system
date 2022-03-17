package com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class RequestShop {
    private final UserInfoRepository userInfoRepository;

    public PUTRequestShopResponse requestShop (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            UserInfo userInfo = userInfoRepository.findUserInfoByUserId(userId);

            userInfo.setUserActivated(true);

            userInfoRepository.save(userInfo);

            return PUTRequestShopResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return PUTRequestShopResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

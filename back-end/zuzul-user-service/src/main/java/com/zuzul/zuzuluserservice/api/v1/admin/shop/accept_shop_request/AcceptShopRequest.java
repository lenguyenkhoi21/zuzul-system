package com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request;

import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.PUTRequestShopResponse;
import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class AcceptShopRequest {
    private final UserInfoRepository userInfoRepository;

    public PUTAcceptShopResponse acceptRequestShop (String type, String userId, Principal principal) {
        if (principal.getName().equals("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d")) {
            UserInfo userInfo = userInfoRepository.findUserInfoByUserId(userId);
            userInfo.setSendRequest(false);
            if (type.equals("accept")) {
                userInfo.setUserActivated(true);

                userInfoRepository.save(userInfo);
            }
            else {
                userInfo.setSendRequestDate(0);
                userInfoRepository.save(userInfo);
            }

            return PUTAcceptShopResponse.builder().status("SUCCESS").build();

        }

        return PUTAcceptShopResponse.builder().status("FAIL").build();
    }
}

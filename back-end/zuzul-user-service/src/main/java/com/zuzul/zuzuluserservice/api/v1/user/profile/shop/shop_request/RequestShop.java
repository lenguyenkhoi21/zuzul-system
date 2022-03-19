package com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class RequestShop {
    private final UserInfoRepository userInfoRepository;
    private final AddressRepository addressRepository;

    public PUTRequestShopResponse requestShop (String userId, PUTRequestShopPayload payload, Principal principal) {
        if (principal.getName().equals(userId)) {
            UserInfo userInfo = userInfoRepository.findUserInfoByUserId(userId);

            if (addressRepository.findAddressByUserIdAndType(userId, true) != null) {
                userInfo.setSendRequest(true);
                userInfo.setSendRequestDate(payload.getSendRequestDate());
                userInfo.setUserShopName(payload.getUserShopName());

                userInfoRepository.save(userInfo);

                return PUTRequestShopResponse
                        .builder()
                        .status("SUCCESS")
                        .build();
            }
        }
        return PUTRequestShopResponse
                .builder()
                .status("NO ADDRESS")
                .build();
    }
}

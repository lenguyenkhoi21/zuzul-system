package com.zuzul.zuzuluserservice.api.v1.user.profile.shop.find_users_by_shopname;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GETUserByShopName {
    private final UserInfoRepository userInfoRepository;

    public Response getUserByShopName (String userId, String shopName, Principal principal) {
        if (principal.getName().equals(userId) || principal.getName().equals("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d")) {
            List<UserInfo> userInfos = userInfoRepository.findAllByUserShopNameFilter(shopName);

            List<UserModel> userModels = new ArrayList<>();
            userInfos.forEach(userInfo -> {
                userModels.add(
                        UserModel
                                .builder()
                                .userShopName(userInfo.getUserShopName())
                                .userId(userInfo.getUserId())
                                .build()
                );
            });

            return Response.builder().userModels(userModels).build();
        }
        return Response.builder().build();
    }
}

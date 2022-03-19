package com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_prd;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetUserInfoByPrd {
    private final UserInfoRepository userInfoRepository;

    public GETUserInfoByPrdResponse getUserInfoByPrd (String adminId, List<String> userIds, Principal principal) {
        if (principal.getName().equals(adminId)) {
            List<UserInfo> users = new ArrayList<>();

            List<String> userInfos = userIds;

            userInfos.forEach(userInfo -> {
                users.add(userInfoRepository.findUserInfoByUserId(userInfo));
            });

            /*return GETUserInfoByPrdResponse.builder()
                    .userShopNames(users
                            .stream()
                            .map(UserInfo::getUserShopName)
                            .collect(Collectors.toList()))
                    .build();*/

            List<String> userShopName = users
                    .stream()
                    .map(UserInfo::getUserShopName)
                    .collect(Collectors.toList());


            return GETUserInfoByPrdResponse.builder().userShopNames(userShopName).build();
        }
        return GETUserInfoByPrdResponse.builder().build();
    }
}

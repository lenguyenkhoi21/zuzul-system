package com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_prd;

import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetUserInfoByPrd {
    private final UserInfoRepository userInfoRepository;

    public List<String> getUserInfoByPrd (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {

        }
        return new ArrayList<>();
    }
}

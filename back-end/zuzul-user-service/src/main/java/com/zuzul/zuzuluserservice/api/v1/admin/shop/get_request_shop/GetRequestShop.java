package com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetRequestShop {
    private final UserInfoRepository userInfoRepository;
    private final AddressRepository addressRepository;

    public List<UserInfoModel> getRequestShop (Principal principal) {
        if(principal.getName().equals("69e77a1e-d7b0-4ae5-bf96-6c93af207c4d")) {
            List<UserInfo> userInfos = userInfoRepository.findAllBySendRequest(true);

            List<UserInfoModel> userInfoModels = new ArrayList<>();

            List<Address> addresses = new ArrayList<>();

            for (int i = 0; i < userInfos.size(); i++) {
                addresses.add(addressRepository.findAddressByUserIdAndType(userInfos.get(i).getUserId(), true));

                userInfoModels.add(UserInfoModel
                        .builder()
                        .sendRequestDate(userInfos.get(i).getSendRequestDate())
                        .address(addresses.get(i).getDetailsAddress()
                                + ", "
                                + addresses.get(i).getUserWard()
                                + ", "
                                + addresses.get(i).getUserDistinct()
                                + ", "
                                + addresses.get(i).getUserCity())
                        .userFullName(userInfos.get(i).getUserFullName())
                        .userId(userInfos.get(i).getUserId())
                        .build());
            }

            return userInfoModels;
        }
        return new ArrayList<>();
    }
}

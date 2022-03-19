package com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_prd;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GETUserInfoByPrdResponse {
    List<String> userShopNames;
}

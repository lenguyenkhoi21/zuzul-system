package com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.update_address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PUTUpdateAddressPayload {
    private String userName;
    private String userPhone;
    private String userWard;
    private String userDistinct;
    private String userCity;
    private String detailsAddress;
    private String userId;
    private List<String> type;
    private String addressId;
}

package com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressModel {
    private String addressId;
    private String userName;
    private String userPhone;
    private String userWard;
    private String userDistinct;
    private String userCity;
    private String detailsAddress;
    private boolean type;
}

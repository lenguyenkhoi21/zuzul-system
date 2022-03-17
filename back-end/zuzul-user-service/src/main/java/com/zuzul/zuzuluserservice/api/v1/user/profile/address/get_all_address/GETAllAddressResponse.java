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
public class GETAllAddressResponse {
    private List<AddressModel> addressList;
    private String status;
}

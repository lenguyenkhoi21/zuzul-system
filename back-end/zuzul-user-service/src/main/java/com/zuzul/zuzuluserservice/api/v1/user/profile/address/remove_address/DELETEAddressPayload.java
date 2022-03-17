package com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DELETEAddressPayload {
    private String userId;
    private String addressId;
}

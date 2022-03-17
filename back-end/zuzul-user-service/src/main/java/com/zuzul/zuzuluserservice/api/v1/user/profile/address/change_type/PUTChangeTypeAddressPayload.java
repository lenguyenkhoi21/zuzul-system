package com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTChangeTypeAddressPayload {
    private String userId;
    private String addressId;
}

package com.zuzul.zuzuluserservice.api.v1.user.update_profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PUTUpdateProfileResponse {
    private String status;
}

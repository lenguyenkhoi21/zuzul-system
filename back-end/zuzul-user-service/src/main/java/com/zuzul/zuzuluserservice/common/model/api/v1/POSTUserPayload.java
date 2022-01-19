package com.zuzul.zuzuluserservice.common.model.api.v1;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class POSTUserPayload {
    private String username;
    private String password;
}

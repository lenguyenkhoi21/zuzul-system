package com.zuzul.zuzuluserservice.api.v1.pub.register;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterPOSTResponse {
    private String status;
}

package com.zuzul.zuzulauthenticationservice.api.v1.register;

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

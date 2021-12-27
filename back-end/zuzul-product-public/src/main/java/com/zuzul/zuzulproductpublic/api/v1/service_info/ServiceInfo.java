package com.zuzul.zuzulproductpublic.api.v1.service_info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceInfo {
    private String name;
    private String description;
    private String version;
}

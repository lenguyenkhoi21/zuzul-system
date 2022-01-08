package com.zuzul.zuzulimageservice.common.aws;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
@RequiredArgsConstructor
public class AWSS3 {
    private final AWSProperties awsProperties;

    @Bean
    public AwsBasicCredentials awsBasicCredentials() {
        return AwsBasicCredentials.create(
                awsProperties.getCredentials().getAccessKeyId(),
                awsProperties.getCredentials().getSecretKeyId());
    }

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                       .region(Region.AP_SOUTHEAST_1)
                       .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials()))
                       .build();
    }
}

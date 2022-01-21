package com.zuzul.zuzuluserservice.common.ultis;

import com.zuzul.zuzuluserservice.common.aws.AWS;
import com.zuzul.zuzuluserservice.common.aws.AWSS3;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Component
@RequiredArgsConstructor
public class ImageUtils {
    private final AWS aws;
    private final AWSS3 awss3;

    public boolean uploadUserImage (String userId, String imageName, byte [] data) {
        String key = aws.getCredentials().getPath() +
                "/user/" +
                userId +
                "/" +
                imageName;

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(aws.getCredentials().getStorage())
                .key(key)
                .build();

        awss3.s3Client()
                .putObject(objectRequest,
                        RequestBody.fromBytes(data));
        return true;
    }

    public byte [] getImage (String imageName, String productId) {
        String key = aws.getCredentials().getPath() +
                "/user/" +
                productId +
                "/" +
                imageName;

        GetObjectRequest getObjectRequest = GetObjectRequest
                .builder()
                .bucket(aws.getCredentials().getStorage())
                .key(key)
                .build();

        return awss3.s3Client()
                .getObjectAsBytes(getObjectRequest)
                .asByteArray();
    }
}

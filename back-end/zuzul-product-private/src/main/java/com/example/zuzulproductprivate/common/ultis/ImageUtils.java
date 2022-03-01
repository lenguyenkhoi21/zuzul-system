package com.example.zuzulproductprivate.common.ultis;

import com.example.zuzulproductprivate.common.aws.AWS;
import com.example.zuzulproductprivate.common.aws.AWSS3;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.*;

@Component
@RequiredArgsConstructor
public class ImageUtils {
    private final AWS aws;
    private final AWSS3 awss3;

    public boolean UploadToAWSS3(String prd_id, String prd_img_name, byte[] data) {
        String key = aws.getCredentials().getPath() +
                "/product/" +
                prd_id +
                "/" +
                prd_img_name;

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                                                         .bucket(aws.getCredentials().getStorage())
                                                         .key(key)
                                                         .build();

        awss3.s3Client()
             .putObject(objectRequest,
                     RequestBody.fromBytes(data));
        return true;
    }

    public boolean UploadToLocal(String fileName, byte[] data) {
        String path = "E:\\Image\\save_image_here\\" + fileName;
        try (FileOutputStream outputStream = new FileOutputStream(path)) {
            outputStream.write(data);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean uploadToCategoryAWSS3 (String categoryId, String categoryImageName, byte [] dataImage) {
        String key = aws.getCredentials().getPath() +
                "/category/" +
                categoryId +
                "/" +
                categoryImageName;

        PutObjectRequest putObjectRequest = PutObjectRequest
                .builder()
                .bucket(aws.getCredentials().getStorage())
                .key(key)
                .build();

        awss3.s3Client()
                .putObject(putObjectRequest,
                        RequestBody.fromBytes(dataImage));

        return true;
    }

    public ResponseBytes<GetObjectResponse> getCategoryImage (String imageName, String categoryId) {
        String key = aws.getCredentials().getPath() +
                "/category/" +
                categoryId +
                "/" +
                imageName;

        GetObjectRequest getObjectRequest = GetObjectRequest
                .builder()
                .bucket(aws.getCredentials().getStorage())
                .key(key)
                .build();

        return awss3.s3Client()
                .getObjectAsBytes(getObjectRequest);
    }

    public ResponseBytes<GetObjectResponse> getImage (String imageName, String productId) {
        String key = aws.getCredentials().getPath() +
                "/product/" +
                productId +
                "/" +
                imageName;

        GetObjectRequest getObjectRequest = GetObjectRequest
                .builder()
                .bucket(aws.getCredentials().getStorage())
                .key(key)
                .build();

        return awss3.s3Client()
                .getObjectAsBytes(getObjectRequest);
    }
}

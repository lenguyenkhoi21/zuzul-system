package com.example.zuzulproductprivate.common.ultis;

import com.example.zuzulproductprivate.common.aws.AWS;
import com.example.zuzulproductprivate.common.aws.AWSS3;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.*;
import java.nio.ByteBuffer;

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
}

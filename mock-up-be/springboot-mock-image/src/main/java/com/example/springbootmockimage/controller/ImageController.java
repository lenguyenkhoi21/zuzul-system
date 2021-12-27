package com.example.springbootmockimage.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListBucketsRequest;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class ImageController {
    private final Logger logger = LoggerFactory.getLogger(ImageController.class);

    private final S3Client s3Client;

    @GetMapping(value = "/images/{src}", produces = MediaType.IMAGE_JPEG_VALUE)
    public Mono<byte[]> getImage(@PathVariable String src,
                                 @RequestParam String w,
                                 @RequestParam String q) throws IOException {
        logger.info("/images/" + src);

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                                                            .bucket("zuzul-storage")
                                                            .key("mock-data/" + src)
                                                            .build();
        byte[] image = s3Client.getObject(getObjectRequest).readAllBytes();
        return Mono.just(image);
    }

    private static class Bucket {
        private String name;
        private String region;

        public Bucket(String name, String region) {
            this.name = name;
            this.region = region;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getRegion() {
            return region;
        }

        public void setRegion(String region) {
            this.region = region;
        }
    }

    private static class ListBucket {
        private List<Bucket> buckets = new ArrayList<>();

        public List<Bucket> getBuckets() {
            return buckets;
        }

        public void setBuckets(List<Bucket> buckets) {
            this.buckets = buckets;
        }
    }

    @GetMapping(value = "/bucket/infor")
    public Mono<ListBucket> BucketInfo() {
        ListBucket myBucket = new ListBucket();
        ListBucketsRequest listBucketsRequest = ListBucketsRequest.builder().build();
        ListBucketsResponse listBucketsResponse = s3Client.listBuckets(listBucketsRequest);
        listBucketsResponse.buckets().forEach(bucket -> {
            myBucket.getBuckets().add(new Bucket(bucket.name(), Region.AP_SOUTHEAST_1.toString()));
        });

        return Mono.just(myBucket);
    }
}

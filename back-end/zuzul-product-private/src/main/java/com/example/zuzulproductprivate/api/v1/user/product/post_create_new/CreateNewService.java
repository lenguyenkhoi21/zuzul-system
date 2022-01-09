package com.example.zuzulproductprivate.api.v1.user.product.post_create_new;

import com.example.zuzulproductprivate.common.model.mongodb.ProductModel;
import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import com.example.zuzulproductprivate.common.ultis.FunctionalUtil;
import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CreateNewService {
    private final ProductRepository productRepository;
    private final ImageUtils imageUtils;

    public Response saveToDatabase(Payload payload,
                                   MultipartFile prd_image1,
                                   MultipartFile prd_image2,
                                   MultipartFile prd_image3,
                                   Principal principal) throws IOException {

        if (principal.getName().equals(payload.getPrd_user_id())) {
            String nameImg1 = FunctionalUtil.renameFile(Objects.requireNonNull(prd_image1.getOriginalFilename()));
            String nameImg2 = FunctionalUtil.renameFile(Objects.requireNonNull(prd_image2.getOriginalFilename()));
            String nameImg3 = FunctionalUtil.renameFile(Objects.requireNonNull(prd_image3.getOriginalFilename()));

            String prd_id = FunctionalUtil.generatePrdUUID();

            List<String> images = new ArrayList<>();
            images.add(nameImg1);
            images.add(nameImg2);
            images.add(nameImg3);

            ProductModel newProduct = ProductModel
                    .builder()
                    .prd_id(prd_id)
                    .prd_user_id(payload.getPrd_user_id())
                    .prd_name(payload.getPrd_name())
                    .prd_cate_id(payload.getPrd_cate_id())
                    .prd_sub_id(payload.getPrd_sub_id())
                    .prd_price_origin(payload.getPrd_price_origin())
                    .prd_origin(payload.getPrd_origin())
                    .prd_date_manufacture(new Date(payload.getPrd_date_manufacture()))
                    .prd_date_expiry(new Date(payload.getPrd_date_expiry()))
                    .prd_month_warranty(payload.getPrd_month_warranty())
                    .prd_date_create(new Date())
                    .prd_long_des(payload.getPrd_long_des())
                    .prd_short_des(payload.getPrd_short_des())
                    .prd_images(images)
                    .prd_sale(0)
                    .prd_react(0)
                    .prd_status("WAITING_FOR_ACCEPT")
                    .build();

            productRepository.save(newProduct);

            boolean isSuccessImg1 = nameImg1 != null &&
                    imageUtils.UploadToAWSS3(prd_id, nameImg1, prd_image1.getBytes());

            boolean isSuccessImg2 = nameImg2 != null &&
                    imageUtils.UploadToAWSS3(prd_id, nameImg2, prd_image2.getBytes());

            boolean isSuccessImg3 = nameImg3 != null &&
                    imageUtils.UploadToAWSS3(prd_id, nameImg3, prd_image3.getBytes());


            return Response.builder()
                           .status("Success")
                           .image1(isSuccessImg1)
                           .image2(isSuccessImg2)
                           .image3(isSuccessImg3)
                           .build();
        }

        return Response.builder().status("Failed")
                       .image1(false)
                       .image2(false)
                       .image3(false)
                       .build();

    }


}

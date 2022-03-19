package com.example.zuzulproductprivate.api.v1.user.product.post_create_new;

import com.example.zuzulproductprivate.common.model.mongodb.Product;
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

        if (principal.getName().equals(payload.getPrdUserId())) {
            String nameImg1 = FunctionalUtil.renameFile(Objects.requireNonNull(prd_image1.getOriginalFilename()));
            String nameImg2 = FunctionalUtil.renameFile(Objects.requireNonNull(prd_image2.getOriginalFilename()));
            String nameImg3 = FunctionalUtil.renameFile(Objects.requireNonNull(prd_image3.getOriginalFilename()));

            String prd_id = FunctionalUtil.generatePrdUUID();

            List<String> images = new ArrayList<>();
            images.add(nameImg1);
            images.add(nameImg2);
            images.add(nameImg3);

            Product newProduct = Product
                    .builder()
                    .prdId(prd_id)
                    .prdUserId(payload.getPrdUserId())
                    .prdName(payload.getPrdName())
                    .prdCateId(payload.getPrdCateId())
                    .prdSubId(payload.getPrdSubId())
                    .prdPriceOrigin(payload.getPrdPriceOrigin())
                    .prdOrigin(payload.getPrdOrigin())
                    .prdDateManufacture(new Date(payload.getPrdDateManufacture()))
                    .prdDateExpiry(payload.getPrdDateExpiry())
                    .prdMonthWarranty(payload.getPrdMonthWarranty())
                    .prdDateCreate(payload.getPrdDateCreate())
                    .prdLongDes(payload.getPrdLongDes())
                    .prdShortDes(payload.getPrdShortDes())
                    .prdImages(images)
                    .prdSale(0)
                    .prdReact(0)
                    .prdNumberInStorage(payload.getPrdNumberInStorage())
                    .prdStatus("WAITING_FOR_ACCEPT")
                    .currentImage(nameImg1) //default
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

package com.example.zuzulproductprivate.api.v1.pub.product.get_product_image;

import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;

@Service
@RequiredArgsConstructor
public class GetProductImage {
    private final ImageUtils imageUtils;

    public byte [] getProductImage (String imageName, String productId) {
        ResponseBytes responseBytes = imageUtils.getImage(imageName, productId);

        return responseBytes.asByteArray();
    }


}

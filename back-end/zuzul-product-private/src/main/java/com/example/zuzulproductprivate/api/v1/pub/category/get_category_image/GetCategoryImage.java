package com.example.zuzulproductprivate.api.v1.pub.category.get_category_image;

import com.example.zuzulproductprivate.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;

@Service
@RequiredArgsConstructor
public class GetCategoryImage {
    private final ImageUtils imageUtils;

    public byte [] getCategoryImage (String imageName, String categoryId) {
        ResponseBytes responseBytes = imageUtils.getCategoryImage(imageName, categoryId);

        return responseBytes.asByteArray();
    }
}

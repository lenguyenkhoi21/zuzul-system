package com.example.zuzulproductprivate.api.v1.pub;

import com.example.zuzulproductprivate.api.v1.pub.get_all_category.GETAllCategory;
import com.example.zuzulproductprivate.api.v1.pub.get_all_category.GETAllCategoryResponse;
import com.example.zuzulproductprivate.api.v1.pub.get_product_by_id.GETProductByIDResponse;
import com.example.zuzulproductprivate.api.v1.pub.get_product_by_id.GetProductByID;
import com.example.zuzulproductprivate.api.v1.pub.get_product_image.GetProductImage;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class PublicController {

    private final GETAllCategory getAllCategory;
    private final GetProductByID getProductByID;
    private final GetProductImage getProductImage;

    @GetMapping("/pub")
    public String helloPub() {
        return "Hello From Private !";
    }

    @GetMapping("/pub/category/all")
    public GETAllCategoryResponse getAllCategory () {
        return getAllCategory.getAllCategory();
    }

    @GetMapping("/pub/product/{productId}")
    public GETProductByIDResponse getAllProduct (@PathVariable("productId") String productId) {
        return getProductByID.getProductById(productId);
    }

    @GetMapping(value = "/pub/image/{productId}/{imageName}",
        produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE}
    )
    public ResponseEntity<byte[]> getAllProduct (@PathVariable("productId") String productId, @PathVariable("imageName") String imageName) {
        byte [] imageData = getProductImage.getProductImage(imageName, productId);

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .contentType(MediaType.IMAGE_PNG)
                .body(imageData);
    }
}

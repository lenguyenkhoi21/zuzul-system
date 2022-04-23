package com.example.zuzulproductprivate.api.v1.pub;
import com.example.zuzulproductprivate.api.v1.pub.category.CategoryModel;
import com.example.zuzulproductprivate.api.v1.pub.category.GETAllCategory;
import com.example.zuzulproductprivate.api.v1.pub.category.get_category_image.GetCategoryImage;
import com.example.zuzulproductprivate.api.v1.pub.product.filter_product.FilterProduct;
import com.example.zuzulproductprivate.api.v1.pub.product.filter_product.SearchModel;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product.GetAllProduct;
import com.example.zuzulproductprivate.api.v1.pub.product.ProductsModel;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category.CategoryModels;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category.GetAllProductByCategory;
import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_sub.GetAllProductBySub;
import com.example.zuzulproductprivate.api.v1.pub.product.get_product_by_id.GETProductByIDResponse;
import com.example.zuzulproductprivate.api.v1.pub.product.get_product_by_id.GetProductByID;
import com.example.zuzulproductprivate.api.v1.pub.product.get_product_image.GetProductImage;
import com.example.zuzulproductprivate.api.v1.pub.subcategory.getAllSubByCate.GETSubCategoryByCatePub;
import com.example.zuzulproductprivate.api.v1.pub.subcategory.getAllSubByCate.SubCategoryModel;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class PublicController {

    private final GETAllCategory getAllCategory;
    private final GetProductByID getProductByID;
    private final GetProductImage getProductImage;
    private final GetAllProduct getAllProduct;
    private final GetAllProductByCategory getAllProductByCategory;
    private final GetAllProductBySub getAllProductBySub;
    private final GetCategoryImage getCategoryImage;
    private final GETSubCategoryByCatePub getSubCategoryByCate;
    private final FilterProduct filterProduct;

    @GetMapping("/pub")
    public String helloPub() {
        return "Hello From Private !";
    }

    @GetMapping("/pub/category/all")
    public List<CategoryModel> getAllCategory () {
        try {
            return getAllCategory.getAllCategory();
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

//    @GetMapping("/pub/category/{categoryId}/{imageName}")
//    public ResponseEntity<byte[]> getCateImage (@PathVariable("categoryId") String categoryId,
//                                                    @PathVariable("imageName") String imageName) {
//        byte [] imageData = getCategoryImage.getCategoryImage(imageName, categoryId);
//
//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.IMAGE_JPEG)
//                .contentType(MediaType.IMAGE_PNG)
//                .body(imageData);
//    }

    @GetMapping("/pub/product/{productId}")
    public GETProductByIDResponse getAllProductById (@PathVariable("productId") String productId) {
        try {
            return getProductByID.getProductById(productId);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return GETProductByIDResponse.builder().build();
    }

    @GetMapping("/pub/product/all")
    public List<ProductsModel> getAllProduct () {
        try {
            return getAllProduct.getAllProducts();
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    @GetMapping("/pub/product/category/{categoryId}")
    public List<CategoryModels> getAllProductByCategory (@PathVariable("categoryId") String categoryId) {
        try {
            return getAllProductByCategory.getProductsByCategory(categoryId);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    //TODO Only open when v1 is complete
//    @GetMapping("/pub/product/category/{subCategoryId}")
//    public List<ProductsModel> getAllProductBySub (@PathVariable("subCategoryId") String subCategoryId) {
//        try {
//            return getAllProductBySub.getAllProductBySub(subCategoryId);
//        }
//        catch (Exception exception) {
//            exception.printStackTrace();
//        }
//        return new ArrayList<>();
//    }

    @PostMapping("/pub/product/category/{categoryId}/sub/multiple")
    public List<ProductsModel> getAllProductBySub (@RequestBody List<String> subCategoryIds,
                                                   @PathVariable("categoryId") String categoryId) {
        try {
            return getAllProductBySub.getAllProductByMultipleSub(subCategoryIds, categoryId);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    @GetMapping("/pub/{categoryId}/sub/all")
    public List<SubCategoryModel> getAllSubByCate(@PathVariable("categoryId") String categoryId) {
        try {
            return getSubCategoryByCate.getSubCategoryByCate(categoryId);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }


//    @GetMapping(value = "/pub/product/{productId}/{imageName}",
//        produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE}
//    )
//    public ResponseEntity<byte[]> getProductImage (@PathVariable("productId") String productId,
//                                                   @PathVariable("imageName") String imageName) {
//        byte [] imageData = getProductImage.getProductImage(imageName, productId);
//
//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.IMAGE_JPEG)
//                .contentType(MediaType.IMAGE_PNG)
//                .body(imageData);
//    }

    @PostMapping("/pub/search/{type}")
    public List<ProductsModel> searchProduct (@PathVariable("type") String type,
                                              @RequestBody SearchModel searchModel) {
        return filterProduct.searchProduct(type, searchModel.getText());
    }
}

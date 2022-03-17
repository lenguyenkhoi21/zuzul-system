package com.example.zuzulproductprivate.api.v1.admin.management.product;

import com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product.GetAllRegisteredProduct;
import com.example.zuzulproductprivate.api.v1.admin.management.product.get_all_registered_product.ProductsModel;
import com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng.Payload;
import com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng.Response;
import com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng.UpdatePrd;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class PrdMngCtl {
    private final UpdatePrd updatePrd;
    private final GetAllRegisteredProduct getAllRegisteredProduct;

    @PutMapping(value = "/admin/management/product",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response censorPrd(@RequestBody Payload payload) {
        return updatePrd.updateProduct(payload);
    }

    @GetMapping(value = "/admin/managment/product/registered/{userId}")
    public List<ProductsModel> getAllRegisteredProduct (@PathVariable("userId") String userId, Principal principal) {
        try {
            return getAllRegisteredProduct.getAllRegisteredProduct(userId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }
}

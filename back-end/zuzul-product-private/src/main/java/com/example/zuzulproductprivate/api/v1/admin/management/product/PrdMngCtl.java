package com.example.zuzulproductprivate.api.v1.admin.management.product;

import com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng.Payload;
import com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng.Response;
import com.example.zuzulproductprivate.api.v1.admin.management.product.prd_mng.UpdatePrd;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.rootPathv1)
@RequiredArgsConstructor
public class PrdMngCtl {
    private final UpdatePrd updatePrd;

    @PutMapping(value = "/admin/management/product",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Response censorPrd(@RequestBody Payload payload) {
        return updatePrd.updateProduct(payload);
    }
}

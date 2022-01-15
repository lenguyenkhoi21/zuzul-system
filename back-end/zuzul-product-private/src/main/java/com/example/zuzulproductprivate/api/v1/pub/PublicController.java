package com.example.zuzulproductprivate.api.v1.pub;

import com.example.zuzulproductprivate.api.v1.pub.get_all_category.GETAllCategory;
import com.example.zuzulproductprivate.api.v1.pub.get_all_category.GETAllCategoryResponse;
import com.example.zuzulproductprivate.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class PublicController {

    private final GETAllCategory getAllCategory;

    @GetMapping("/pub")
    public String helloPub() {
        return "Hello From Private !";
    }

    @GetMapping("/pub/category/all")
    public GETAllCategoryResponse getAllCategory () {
        return getAllCategory.getAllCategory();
    }
}

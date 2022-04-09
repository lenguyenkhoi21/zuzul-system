package com.example.zuzulproductprivate.pub.unitTest;

import com.example.zuzulproductprivate.api.v1.pub.product.get_all_product_by_category.SubCategoryModels;
import com.example.zuzulproductprivate.api.v1.pub.subcategory.getAllSubByCate.GETSubCategoryByCatePub;
import com.example.zuzulproductprivate.api.v1.pub.subcategory.getAllSubByCate.SubCategoryModel;
import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.SubCategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class GetSubCatesByCategoryUserUnitTest {

    GETSubCategoryByCatePub getSubsByCate;

    SubCategoryRepository subCategoryRepository;

    @BeforeEach
    void setup() {
        subCategoryRepository = Mockito.spy(SubCategoryRepository.class);
        getSubsByCate = new GETSubCategoryByCatePub(subCategoryRepository);
    }

    @Test
    void getSubCatesByCate(){

        List<SubCategory> subCategories = new ArrayList<>();
        subCategories.add(Mockito.mock(SubCategory.class));
        Mockito.doReturn(subCategories).when(subCategoryRepository).getAllByCategoryId("1");
        List<SubCategoryModel> result = getSubsByCate.getSubCategoryByCate("1");
        Assertions.assertEquals(result.size(), 1);
    }
}

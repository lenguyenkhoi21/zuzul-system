package com.example.zuzulproductprivate.adminManagement.sub.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.CategoryModel;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_all_categories.GETAllCategoryAdmin;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_cat.GETSubCategoryByCate;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_cat.SubCategoryModel;
import com.example.zuzulproductprivate.common.model.mongodb.Category;
import com.example.zuzulproductprivate.common.model.mongodb.SubCategory;
import com.example.zuzulproductprivate.common.repo.mongodb.CategoryRepository;
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
public class GetSubCatesByCateTest {

    GETSubCategoryByCate getAllSubCategories;
    SubCategoryRepository subCategoryRepository;

    @BeforeEach
    void setup() {
        subCategoryRepository = Mockito.spy(SubCategoryRepository.class);
        getAllSubCategories = new GETSubCategoryByCate(subCategoryRepository);
    }

    @Test
    void getSubCategories(){
        List<SubCategory> subCates = new ArrayList<>();
        subCates.add(new SubCategory("1","1","cat1","1","c1","ok"));
        subCates.add(new SubCategory("2","2","cat2","2","c1","ok"));
        Mockito.doReturn(subCates).when(subCategoryRepository).getAllByCategoryId("c1");
        String userId = "userId1";
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn(userId).when(principal).getName();

        List<SubCategoryModel> result = getAllSubCategories.getSubCategoryByCate(principal,userId,"c1");
        Assertions.assertEquals(result.size(), 2);
        Assertions.assertEquals(result.get(0).getSubCategoryId(), "1");
        Assertions.assertEquals(result.get(1).getSubCategoryId(), "2");

    }
}

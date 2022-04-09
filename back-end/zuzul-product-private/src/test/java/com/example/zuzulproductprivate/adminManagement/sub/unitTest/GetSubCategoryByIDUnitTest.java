package com.example.zuzulproductprivate.adminManagement.sub.unitTest;

import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GETCategoryByIDResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.category.get_category_by_id.GetCategoryByID;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_id.GETSubCategoryIdResponse;
import com.example.zuzulproductprivate.api.v1.admin.management.sub.get_subcat_by_id.GetSubCategoryById;
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

@SpringBootTest
public class GetSubCategoryByIDUnitTest {

    GetSubCategoryById getSubCategoryByID;
    SubCategoryRepository subCategoryRepository;

    @BeforeEach
    void setup() {
        subCategoryRepository = Mockito.spy(SubCategoryRepository.class);
        getSubCategoryByID = new GetSubCategoryById(subCategoryRepository);
    }

    @Test
    void getCateID(){
        SubCategory cate = new SubCategory("1","1","a","a","c1","ok");

        Mockito.doReturn(cate).when(subCategoryRepository).findSubCategoryBySubCategoryId("1");
        String userId = "userId1";
        Principal principal = Mockito.spy(Principal.class);

        Mockito.doReturn(userId).when(principal).getName();

        GETSubCategoryIdResponse result = getSubCategoryByID.getSubCategoryId(userId,"1",principal);
        Assertions.assertEquals(result.getSubCategoryName(), "a");
    }
}

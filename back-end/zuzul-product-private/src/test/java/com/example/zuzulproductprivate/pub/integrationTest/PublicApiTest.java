package com.example.zuzulproductprivate.pub.integrationTest;

import static org.hamcrest.Matchers.comparesEqualTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.example.zuzulproductprivate.common.ultis.Constant;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class PublicApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHelloPub() throws Exception {
        this.mockMvc.perform(
                get(Constant.rootPathV1 + "/pub")
        ).andDo(
                print()
        ).andExpect(status().isOk())
                .andExpect(content().string(comparesEqualTo("Hello From Private !")));
    }
    @Test
    public void testGetAllCategory() throws Exception {
        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/pub/category/all"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].categoryId").value("cate-af5faa32-0fd5-4940-8e96-7e4a6e3eb658"))
                .andExpect(jsonPath("$[0].categoryName").value("Áo Dày"))
                .andExpect(jsonPath("$[0].categoryImage").value("cate-img-86cba0d7-0360-4fec-bcc2-7e16050e22c9.jpg"))
                .andExpect(jsonPath("$[0].categoryDescription").value("Áo Dày Nam"))
        ;
    }
    @Test
    public void testGetProductById() throws Exception {
        String productId = "prd-9cbcd9e3-b3cc-4a36-a9ab-7ab9e2923c30";
        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/pub/product/" + productId))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.prdUserId").value("1e9e03b0-438e-4dd2-96d4-a3c71abdbf5d"))
                .andExpect(jsonPath("$.prdName").value("Áo khoác"))
                .andExpect(jsonPath("$.prdPriceOrigin").value(55000))
                .andExpect(jsonPath("$.prdShortDes").value("Sản phẩn này là hàng chất lượng cao"))
        ;
    }
    @Test
    public void testGetAllProducts() throws Exception {
        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/pub/product/all"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].prdUserId").value("1e9e03b0-438e-4dd2-96d4-a3c71abdbf5d"))
                .andExpect(jsonPath("$[0].prdName").value("Áo khoác"))
                .andExpect(jsonPath("$[0].prdPriceOrigin").value(55000))
                .andExpect(jsonPath("$[0].prdShortDes").value("Sản phẩn này là hàng chất lượng cao"))
        ;
    }
    @Test
    public void testGetAllProductsByCategory() throws Exception {
        String cateID = "cate-af5faa32-0fd5-4940-8e96-7e4a6e3eb658";
        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/pub/product/category/"+ cateID))
                .andDo(print()).andExpect(status().isOk())
        ;
    }
    @Test
    public void testGetAllProductsBySub() throws Exception {
        this.mockMvc.perform(post(
                Constant.rootPathV1 + "/pub/product/category/sub/multiple")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("[\"sub-cate-26428007-04ce-49aa-b0b0-ef47c85004d6\"]")
                )
                .andDo(print()).andExpect(status().isOk())
        ;
    }
}

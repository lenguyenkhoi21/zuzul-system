package com.zuzul.zuzuluserservice.user.integrationTest;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserApiTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void testGetUserInfoById() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/user/profile/" + "84f16d78-2dc4-4e21-aeb1-fa13f4539535")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
//                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }
    @Test
    public void testGetAllItems() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/user/84f16d78-2dc4-4e21-aeb1-fa13f4539535/cart")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }
    @Test
    public void testAddItemToCart() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        String prdId = "prd-9cbcd9e3-b3cc-4a36-a9ab-7ab9e2923c30";
        String purchaserId = "84f16d78-2dc4-4e21-aeb1-fa13f4539535";
        String sellerId = "5c6768dc-27bb-4ebb-949b-a075dfa1f40e";
        this.mockMvc.perform(
                        post(Constant.rootPathV1 + "/user/cart")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"productId\": \""+prdId+"\", \"purchaserId\": \""+purchaserId+"\", \"sellerId\": \""+sellerId+"\", \"count\": \"2\"}")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }

    @Test
    public void testGetInfo() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        String adminId = "84f16d78-2dc4-4e21-aeb1-fa13f4539535";
        this.mockMvc.perform(
                        post(Constant.rootPathV1 + "/user/userInfoByPrd/"+adminId)
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("[\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\"]")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.userShopNames").value("Minh Huỳnh Shop"))
        ;
    }

    @Test
    public void testUpdateProfile() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/user/profile")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userId\":\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\",\"userFullName\":\"minh test\",\"userPhone\":\"0932565923\",\"userBirthday\":\"976752000\",\"userSex\":\"MALE\",\"userEmail\":\"minh@gmail.com\",\"userName\":\"minh\"}")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }

    @Test
    public void testChangeNumberItems() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/user/cart")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"productId\":\"prd-9cbcd9e3-b3cc-4a36-a9ab-7ab9e2923c30\",\"purchaserId\":\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\",\"count\":\"8\"}")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }

    @Test
    public void testRequestShop() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/user/profile/request_shop/"+"84f16d78-2dc4-4e21-aeb1-fa13f4539535")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userShopName\":\"Minh Huỳnh shop\",\"sendRequestDate\":\"1648177549\"}")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }
    @Test
    public void testDeleteItem() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        this.mockMvc.perform(
                        delete(Constant.rootPathV1 + "/user/cart")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"purchaserId\":\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\",\"productId\":\"prd-9cbcd9e3-b3cc-4a36-a9ab-7ab9e2923c30\"}")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }
    private String[] login(String username, String password) throws Exception {
        URL url = new URL("http://localhost:7990/zuzul-user-service/v2/admin/login");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json; utf-8");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);
        String jsonInputString = "{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}";
        OutputStream os = con.getOutputStream();
        byte[] input = jsonInputString.getBytes("utf-8");
        os.write(input, 0, input.length);
        BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
        StringBuilder response = new StringBuilder();
        String responseLine = null;
        while ((responseLine = br.readLine()) != null) {
            response.append(responseLine.trim());
        }
        JSONObject obj = new JSONObject(response.toString());
        return new String[] { obj.getString("userID"), obj.getString("access_token") };
    }


}

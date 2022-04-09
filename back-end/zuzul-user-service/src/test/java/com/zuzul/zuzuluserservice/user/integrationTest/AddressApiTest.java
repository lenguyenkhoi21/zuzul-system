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
public class AddressApiTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void testGetAllAddress() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/user/address/" + "84f16d78-2dc4-4e21-aeb1-fa13f4539535")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
        ;
    }
    @Test
    public void testGetAddressById() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/user/84f16d78-2dc4-4e21-aeb1-fa13f4539535/address/address-12856667-d5bb-4d49-b9fb-a0eae582589f")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
        ;
    }
    @Test
    public void testCreateAddress() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        this.mockMvc.perform(
                        post(Constant.rootPathV1 + "/user/address")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userName\":\"userName\",\"userPhone\":\"0123455678\",\"userWard\":\"userWard\",\"userDistinct\":\"userDistinct\",\"userCity\":\"userCity\",\"detailsAddress\":\"detailsAddress\",\"userId\":\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\",\"type\":\"false\"}")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }

    @Test
    public void testUpdateAddress() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/user/address")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userName\":\"test\",\"userPhone\":\"0123455678\",\"userWard\":\"userWard\",\"userDistinct\":\"userDistinct\",\"userCity\":\"userCity\",\"detailsAddress\":\"detailsAddress\",\"userId\":\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\",\"addressId\":\"address-d6b242a7-f3ae-4e82-8ff5-409194c7ae23\"}")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"))
        ;
    }

    @Test
    public void testSetDefalt() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];
        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/user/address/setDefault")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userId\":\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\", \"addressId\":\"address-d6b242a7-f3ae-4e82-8ff5-409194c7ae23\"}")
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
                        delete(Constant.rootPathV1 + "/user/address")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userId\":\"84f16d78-2dc4-4e21-aeb1-fa13f4539535\", \"addressId\":\"address-d6b242a7-f3ae-4e82-8ff5-409194c7ae23\"}")
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

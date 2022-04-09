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
public class HistoryShopApiTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void testGetAllHistoryShop() throws Exception {
        String[] result = login("minh", "minh");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/user/84f16d78-2dc4-4e21-aeb1-fa13f4539535/historyShop/DELIVERING/cate-af5faa32-0fd5-4940-8e96-7e4a6e3eb658")
                                .header("Authorization", "Bearer " + accessToken)
                                .header("tmx-correlation-id", userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
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

package com.example.zuzulproductprivate.adminManagement.product;

import com.example.zuzulproductprivate.common.ultis.Constant;
import com.example.zuzulproductprivate.common.usercontext.UserContext;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductManagementApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCencorProduct() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/admin/management/product")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"prdId\":\"prd-e37a90c1-a51a-4294-8180-d11ac3965c60\", \"prdUserId\":\"" + userID + "\"}")
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
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

    private MockMultipartFile makeMultipartFile(String requestPartName, String filename,
                              String contentType, String pathOnClassPath) throws Exception {

        return new MockMultipartFile(requestPartName, filename,
                contentType, readResourceFile(pathOnClassPath));
    }

    // make text-part using MockMultipartFile
    private MockMultipartFile makeMultipartTextPart(String requestPartName,
                                                    String value, String contentType) throws Exception {

        return new MockMultipartFile(requestPartName, "", contentType,
                value.getBytes(Charset.forName("UTF-8")));
    }

    private byte[] readResourceFile(String pathOnClassPath) throws Exception {
        Path path = Paths.get(new File(pathOnClassPath).getAbsolutePath());
        return Files.readAllBytes(path);
    }
}

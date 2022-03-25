package com.example.zuzulproductprivate.adminManagement.category;

import com.example.zuzulproductprivate.common.ultis.Constant;
import com.example.zuzulproductprivate.common.usercontext.UserContext;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
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

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.comparesEqualTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CategoryApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllCategories() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/admin/management/category/all/" + userID)
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].categoryId").value("cate-af5faa32-0fd5-4940-8e96-7e4a6e3eb658"))
                .andExpect(jsonPath("$[0].categoryName").value("Áo Dày"))
                .andExpect(jsonPath("$[0].categoryImage").value("cate-img-86cba0d7-0360-4fec-bcc2-7e16050e22c9.jpg"))
        ;
    }

    @Test
    public void testGetCategoryById() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];
        String cateId = "cate-af5faa32-0fd5-4940-8e96-7e4a6e3eb658";

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/admin/management/category/" + userID+ "/" + cateId)
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.categoryName").value("Áo Dày"))
                .andExpect(jsonPath("$.categoryImage").value("cate-img-86cba0d7-0360-4fec-bcc2-7e16050e22c9.jpg"))
        ;
    }

    @Test
    public void testCreateCategory() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        multipart(Constant.rootPathV1 + "/admin/management/category")
                                .file(makeMultipartFile( "cat_image", "PixelApple.png", "application/octet-stream", "src/test/PixelApple.png"))
                                .param("userId", userID)
                                .param("categoryName", "testCategoryTest")
                                .param("categoryDescription", "testDesTest")
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"));
    }

    @Test
    public void testUpdateCategory() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        multipart(Constant.rootPathV1 + "/admin/management/category/")
                                .file(makeMultipartFile( "cat_image", "PixelApple.png", "application/octet-stream", "src/test/PixelApple.png"))
                                .with(new RequestPostProcessor() {
                                    @Override
                                    public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
                                        request.setMethod("PUT");
                                        return request;
                                    }
                                })
                                .param("categoryId", "cate-60f56be7-e57e-4edf-b78b-1ca372a528c0")
                                .param("categoryName", "testCategoryABC")
                                .param("userId", userID)
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"));
    }

    @Test
    public void testDisableCategory() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
//                        multipart(Constant.rootPathV1 + "/admin/management/category/disable")
                        put(Constant.rootPathV1 + "/admin/management/category/disable")
                                .content("{\"categoryId\": \"cate-60f56be7-e57e-4edf-b78b-1ca372a528c0\", \"userId\": \"" + userID + "\"}")
//                                .file(makeMultipartFile( "cat_image", "PixelApple.png", "application/octet-stream", "src/test/PixelApple.png"))
                                .contentType(MediaType.APPLICATION_JSON)
//                                .with(new RequestPostProcessor() {
//                                    @Override
//                                    public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
//                                        request.setMethod("PUT");
//                                        return request;
//                                    }
//                                })
//                                .param("categoryId", "cate-60f56be7-e57e-4edf-b78b-1ca372a528c0")
//                                .param("userId", userID)
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"));
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

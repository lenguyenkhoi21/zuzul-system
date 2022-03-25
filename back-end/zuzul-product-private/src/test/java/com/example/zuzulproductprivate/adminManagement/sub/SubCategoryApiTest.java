package com.example.zuzulproductprivate.adminManagement.sub;

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
public class SubCategoryApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllSubCategoriesByCategory() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];
        String cateId = "cate-af5faa32-0fd5-4940-8e96-7e4a6e3eb658";
        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/admin/management/sub/all/" + userID+ "/"+cateId)
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$[0].subCategoryId").value("sub-cate-26428007-04ce-49aa-b0b0-ef47c85004d6"))
                .andExpect(jsonPath("$[0].subCategoryName").value("Áo khoác mùa thu"))
                .andExpect(jsonPath("$[0].subCategoryDescription").value("aaa"))
        ;
    }

    @Test
    public void testGetSubCategoryById() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];
        String subCateId = "sub-cate-26428007-04ce-49aa-b0b0-ef47c85004d6";

        this.mockMvc.perform(
                        get(Constant.rootPathV1 + "/admin/management/sub/" + userID+ "/" + subCateId)
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.subCategoryId").value("sub-cate-26428007-04ce-49aa-b0b0-ef47c85004d6"))
                .andExpect(jsonPath("$.subCategoryName").value("Áo khoác mùa thu"))
        ;
    }

    @Test
    public void testCreateSubCategory() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];
        String cateId = "cate-af5faa32-0fd5-4940-8e96-7e4a6e3eb658";
        this.mockMvc.perform(
                        post(Constant.rootPathV1 + "/admin/management/sub")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userId\":\""+userID+"\",\"subCategoryName\": \"testSubCategoryTest\",\"subCategoryDescription\": \"testDesTest\",\"categoryId\":\"" +cateId+"\"}")
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"));
    }

    @Test
    public void testUpdateSubCategory() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/admin/management/sub")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"subCategoryId\": \"sub-cate-ad050816-951e-4e9e-b53e-152cf1405978\",\"subCategoryName\": \"testCategory1\",\"userId\":\"" + userID +"\" }")
                                .header(UserContext.AUTH_TOKEN, "Bearer " + accessToken)
                                .header(UserContext.CORRELATION_ID, userID)
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("SUCCESS"));
    }

    @Test
    public void testDisableSubCategory() throws Exception {
        String[] result = login("admin-system", "admin-system");
        String userID = result[0];
        String accessToken = result[1];

        this.mockMvc.perform(
                        put(Constant.rootPathV1 + "/admin/management/sub/disable")
//                                .file(makeMultipartFile( "cat_image", "PixelApple.png", "application/octet-stream", "src/test/PixelApple.png"))
//                                .with(new RequestPostProcessor() {
//                                    @Override
//                                    public MockHttpServletRequest postProcessRequest(MockHttpServletRequest request) {
//                                        request.setMethod("PUT");
//                                        return request;
//                                    }
//                                })
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{\"userId\": \""+userID+"\",\"subCategoryId\": \"sub-cate-ad050816-951e-4e9e-b53e-152cf1405978\"}")
//                                .param("subCategoryId", "cate-60f56be7-e57e-4edf-b78b-1ca372a528c0")
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

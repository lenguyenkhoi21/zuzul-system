package com.zuzul.zuzuluserservice.admin;

import com.zuzul.zuzuluserservice.common.ultis.Constant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AdminLoginApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testAdminLoginValid() throws Exception {
        this.mockMvc
                .perform(post(Constant.rootPathV2 + "/admin/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"admin-system\",\"password\":\"admin-system\"}"))
                .andDo(print()).andExpect(status().isOk())
                .andExpect(jsonPath("$.access_token").isNotEmpty())
                .andExpect(jsonPath("$.userID").isNotEmpty());
    }
}

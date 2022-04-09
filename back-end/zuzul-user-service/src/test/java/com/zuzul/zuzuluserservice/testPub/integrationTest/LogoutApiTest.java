package com.zuzul.zuzuluserservice.testPub.integrationTest;

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
public class LogoutApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testLogout() throws Exception {
        this.mockMvc
                .perform(post(Constant.rootPathV1 + "/pub/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"minh\",\"password\":\"minh\"}"))
                .andDo(print()).andExpect(status().isOk())
                ;

    }
}

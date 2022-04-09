package com.zuzul.zuzuluserservice.user.unitTest.History;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history.CreateHistory;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history.Details;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history.POSTCreateHistoryPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history.POSTCreateHistoryResponse;
import com.zuzul.zuzuluserservice.common.adminclient.AdminClient;
import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.repo.mongodb.*;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.client.discovery.DiscoveryClient;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class CreateHistoryUnitTest {
    HistoryRepository historyRepository;
    CartRepository cartRepository;
    OrderDetailsRepository orderDetailsRepository;
    HistoryShopRepository historyShopRepository;
    AdminClient adminClient;
    DiscoveryClient discoveryClient;
    ObjectMapper objectMapper;
    CreateHistory createHistory;

    @BeforeEach
    void setup(){
        historyRepository = Mockito.spy(HistoryRepository.class);
        cartRepository = Mockito.spy(CartRepository.class);
        orderDetailsRepository = Mockito.spy(OrderDetailsRepository.class);
        historyShopRepository = Mockito.spy(HistoryShopRepository.class);
        adminClient = Mockito.mock(AdminClient.class);
        discoveryClient = Mockito.mock(DiscoveryClient.class);
        objectMapper = Mockito.mock(ObjectMapper.class);
        createHistory = new CreateHistory(historyRepository,cartRepository,orderDetailsRepository,historyShopRepository,adminClient,discoveryClient,objectMapper);
    }
    @Test
    public void PostHistory() throws Exception {
        List<Details> detailsList = new ArrayList<>();
        POSTCreateHistoryPayload payload = new POSTCreateHistoryPayload("u1",1,"a","pay","aa","0",1l,detailsList);
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        POSTCreateHistoryResponse response = createHistory.createHistory(payload,principal);
        Assert.assertEquals(response.getStatus(),"SUCCESS");
    }
}


package com.zuzul.zuzuluserservice.user.unitTest.History;

import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.AddressModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.GetAllAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history.GetAllHistory;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history.HistoryModel;
import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.OrderDetailsRepository;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;


@SpringBootTest
public class GetAllHistoryUnitTest {
    HistoryRepository historyRepository;
    OrderDetailsRepository orderDetailsRepository;
    GetAllHistory getAllHistory;

    @BeforeEach
    void setup(){
        historyRepository = Mockito.spy(HistoryRepository.class);
        orderDetailsRepository = Mockito.spy(OrderDetailsRepository.class);
        getAllHistory = new GetAllHistory(historyRepository,orderDetailsRepository);
    }
    @Test
    public void GetAll() throws Exception {
        List<History> histories = new ArrayList<>();
        histories.add(Mockito.mock(History.class));
        List<OrderDetails> orderDetails = new ArrayList<>();
        orderDetails.add(Mockito.mock(OrderDetails.class));
        Principal principal = Mockito.spy(Principal.class);

        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(orderDetails).when(orderDetailsRepository).findAllByHistoryId(Mockito.any());
        Mockito.doReturn(histories).when(historyRepository).findAllByUserId("u1");

        List<HistoryModel> result = getAllHistory.getAllHistory("u1",principal);
        Assert.assertEquals(result.size(), 1);
    }
}


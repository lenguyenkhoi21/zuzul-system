package com.zuzul.zuzuluserservice.user.unitTest.History;

import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GETAllItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GetAllItems;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details.GETHistoryDetailResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details.GetHistoryDetail;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details.OrderDetailsModel;
import com.zuzul.zuzuluserservice.common.model.mongodb.Cart;
import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import com.zuzul.zuzuluserservice.common.repo.mongodb.CartRepository;
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
public class GetHistoryDetailUnitTest {
    OrderDetailsRepository orderDetailsRepository;
    HistoryRepository historyRepository;
    GetHistoryDetail getHistoryDetail;

    @BeforeEach
    void setup(){
        orderDetailsRepository = Mockito.spy(OrderDetailsRepository.class);
        historyRepository = Mockito.spy(HistoryRepository.class);
        getHistoryDetail = new GetHistoryDetail(orderDetailsRepository,historyRepository);
    }
    @Test
    public void GetDetail() throws Exception {

        List<OrderDetails> orderDetails = new ArrayList<>();
        orderDetails.add(Mockito.mock(OrderDetails.class));
        History history = Mockito.mock(History.class);

        Principal principal = Mockito.spy(Principal.class);
        List<OrderDetailsModel> orderDetailsModels = new ArrayList<>();
        orderDetailsModels.add(Mockito.mock(OrderDetailsModel.class));

        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(history).when(historyRepository).findByHistoryId("1");
        Mockito.doReturn("u1").when(history).getUserName();
        Mockito.doReturn(orderDetails).when(orderDetailsRepository).findAllByHistoryId("1");
        GETHistoryDetailResponse response = getHistoryDetail.getHistoryDetail("u1","1",principal);
        Assert.assertNotNull(response.getUserName());
    }
}


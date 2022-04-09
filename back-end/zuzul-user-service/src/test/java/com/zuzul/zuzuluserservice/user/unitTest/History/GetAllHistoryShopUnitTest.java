package com.zuzul.zuzuluserservice.user.unitTest.History;

import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history.GetAllHistory;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history.HistoryModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.GetAllHistoryShop;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.HistoryShopModels;
import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import com.zuzul.zuzuluserservice.common.model.mongodb.HistoryShop;
import com.zuzul.zuzuluserservice.common.model.mongodb.OrderDetails;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryRepository;
import com.zuzul.zuzuluserservice.common.repo.mongodb.HistoryShopRepository;
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
public class GetAllHistoryShopUnitTest {
    HistoryShopRepository historyShopRepository;
    GetAllHistoryShop getAllHistoryShop;

    @BeforeEach
    void setup(){
        historyShopRepository = Mockito.spy(HistoryShopRepository.class);
        getAllHistoryShop = new GetAllHistoryShop(historyShopRepository);
    }
    @Test
    public void GetAllByUserIdAndCateId() throws Exception {

        List<HistoryShop> historyShops = new ArrayList<>();
        historyShops.add(Mockito.mock(HistoryShop.class));
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(historyShops).when(historyShopRepository).findAllByUserIdAndCategoryId("u1","c1");
        List<HistoryShopModels> result = getAllHistoryShop.getAllHistoryShop("u1","ALL","c1",principal);
        Assert.assertEquals(result.size(), 1);
    }
    @Test
    public void GetAllByUserIdAndStatus() throws Exception {

        List<HistoryShop> historyShops = new ArrayList<>();
        historyShops.add(Mockito.mock(HistoryShop.class));
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(historyShops).when(historyShopRepository).findAllByUserIdAndStatus("u1","ok");
        List<HistoryShopModels> result = getAllHistoryShop.getAllHistoryShop("u1","ok","ALL",principal);
        Assert.assertEquals(result.size(), 1);
    }
    @Test
    public void GetAllByUserId() throws Exception {

        List<HistoryShop> historyShops = new ArrayList<>();
        historyShops.add(Mockito.mock(HistoryShop.class));
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(historyShops).when(historyShopRepository).findAllByUserId("u1");
        List<HistoryShopModels> result = getAllHistoryShop.getAllHistoryShop("u1","ALL","ALL",principal);
        Assert.assertEquals(result.size(), 1);
    }

    @Test
    public void GetAllByUserIdandStatusandCateId() throws Exception {

        List<HistoryShop> historyShops = new ArrayList<>();
        historyShops.add(Mockito.mock(HistoryShop.class));
        Principal principal = Mockito.spy(Principal.class);
        Mockito.doReturn("u1").when(principal).getName();
        Mockito.doReturn(historyShops).when(historyShopRepository).findAllByUserIdAndStatusAndAndCategoryId("u1","ok","c1");
        List<HistoryShopModels> result = getAllHistoryShop.getAllHistoryShop("u1","ok","c1",principal);
        Assert.assertEquals(result.size(), 1);
    }
}


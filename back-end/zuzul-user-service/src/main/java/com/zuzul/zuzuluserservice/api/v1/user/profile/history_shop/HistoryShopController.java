package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop;

import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.GetAllHistoryShop;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.HistoryShopModels;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class HistoryShopController {
    private final GetAllHistoryShop getAllHistoryShop;

    @RolesAllowed("USER")
    @GetMapping("/user/{userId}/historyShop/{status}/{categoryId}")
    public List<HistoryShopModels> getAllHistoryShop(@PathVariable("userId") String userId,
                                                     @PathVariable("status") String status,
                                                     @PathVariable("categoryId") String categoryId,
                                                     Principal principal) {
        try {
            return getAllHistoryShop.getAllHistoryShop(userId, status, categoryId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }
}

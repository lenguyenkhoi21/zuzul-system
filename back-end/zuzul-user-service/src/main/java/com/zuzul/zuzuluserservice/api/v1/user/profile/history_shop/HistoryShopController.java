package com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop;

import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.accept_order.ChangeStateOrder;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.accept_order.PUTChangeStateOrderPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.GetAllHistoryShop;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history_shop.get_all_history_shop.HistoryShopModels;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class HistoryShopController {
    private final GetAllHistoryShop getAllHistoryShop;
    private final ChangeStateOrder changeStateOrder;

    @RolesAllowed("USER")
    @GetMapping("/user/{userId}/historyShop/{status}")
    public List<HistoryShopModels> getAllHistoryShop(@PathVariable("userId") String userId,
                                                     @PathVariable("status") String status,
                                                     Principal principal) {
        try {
            return getAllHistoryShop.getAllHistoryShop(userId, status, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    @RolesAllowed("USER")
    @PutMapping("/user/historyShop")
    public List<HistoryShopModels> changeOrder(@RequestBody PUTChangeStateOrderPayload payload,
                                                     Principal principal) {
        try {
            return changeStateOrder.changeOrder(payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }
}

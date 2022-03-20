package com.zuzul.zuzuluserservice.api.v1.admin.shop;

import com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request.AcceptShopRequest;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.accept_shop_request.PUTAcceptShopResponse;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop.GetRequestShop;
import com.zuzul.zuzuluserservice.api.v1.admin.shop.get_request_shop.UserInfoModel;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class ShopAdminController {
    private final GetRequestShop getRequestShop;
    private final AcceptShopRequest acceptShopRequest;

    @RolesAllowed("ADMIN")
    @GetMapping("/admin/shop/requestShop")
    public List<UserInfoModel> getRequestShop (Principal principal) {
        try {
            return getRequestShop.getRequestShop(principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ArrayList<>();
    }

    @RolesAllowed("ADMIN")
    @PutMapping("/admin/shop/{type}/{userId}")
    public PUTAcceptShopResponse acceptShop (@PathVariable("type") String type, @PathVariable("userId") String userId, Principal principal) {
        try {
            return acceptShopRequest.acceptRequestShop(type, userId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTAcceptShopResponse.builder().status("FAIL").build();
    }
}

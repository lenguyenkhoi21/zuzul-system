package com.zuzul.zuzuluserservice.api.v1.user;

import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.AddItemToCart;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.POSTItemToCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.POSTItemToCartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.ChangeNumberItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GETAllItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GetAllItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DELETEItemInCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DELETEItemInCartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DeleteItem;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.PUTRequestShopResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.RequestShop;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_id.GETUserInfoByIdResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_id.GetUserInfoById;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info.PUTUpdateProfilePayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info.PUTUpdateProfileResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info.UpdateProfile;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class UserController {
    private final UpdateProfile updateProfile;
    private final AddItemToCart addItemToCart;
    private final ChangeNumberItems changeNumberItems;
    private final GetAllItems getAllItems;
    private final DeleteItem deleteItem;
    private final GetUserInfoById getUserInfoById;
    private final RequestShop requestShop;

    @RolesAllowed("USER")
    @PutMapping("/user/profile")
    public PUTUpdateProfileResponse updateProfile (@RequestBody PUTUpdateProfilePayload payload, Principal principal) {
        return updateProfile.updateProfile(payload, principal);
    }

    @RolesAllowed("USER")
    @PostMapping("/user/cart")
    public POSTItemToCartResponse addItemToCart (@RequestBody POSTItemToCartPayload payload, Principal principal) {
        return addItemToCart.addItemToCart(payload, principal);
    }

    @RolesAllowed("USER")
    @PutMapping("/user/cart")
    public PUTNumberItemsResponse changeNumberItems (@RequestBody PUTNumberItemsPayload payload, Principal principal) {
        return changeNumberItems.changeNumberItems(payload, principal);
    }

    @RolesAllowed("USER")
    @GetMapping("/user/{userId}/cart")
    public GETAllItemsResponse getAllItems (@PathVariable("userId") String userId, Principal principal) {
        return getAllItems.getAllItemsInCart(userId, principal);
    }

    @RolesAllowed("USER")
    @DeleteMapping("/user/cart")
    public DELETEItemInCartResponse deleteItem (DELETEItemInCartPayload payload, Principal principal) {
        return deleteItem.deleteItemInCart(payload, principal);
    }

    @RolesAllowed("USER")
    @GetMapping("/user/profile/{userId}")
    public GETUserInfoByIdResponse getUserInfoById (@PathVariable("userId") String userId, Principal principal) {
        try {
            return getUserInfoById.getUserInfoById(userId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return GETUserInfoByIdResponse.builder().build();
    }

    @RolesAllowed("USER")
    @PutMapping("/user/profile/request_shop/{userId}")
    public PUTRequestShopResponse requestShop (@PathVariable("userId") String userId, Principal principal) {
        try {
            return requestShop.requestShop(userId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTRequestShopResponse.builder().build();
    }
}

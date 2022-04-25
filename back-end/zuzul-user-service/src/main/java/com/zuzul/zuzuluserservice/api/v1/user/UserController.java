package com.zuzul.zuzuluserservice.api.v1.user;

import com.zuzul.zuzuluserservice.api.v1.user.cart.CartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.AddItemToCart;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.POSTItemToCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.ChangeNumberItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GetAllItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DELETEItemInCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DeleteItem;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.find_users_by_shopname.GETUserByShopName;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.find_users_by_shopname.Response;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.find_users_by_shopname.UserModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.PUTRequestShopPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.PUTRequestShopResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.shop.shop_request.RequestShop;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_id.GETUserInfoByIdResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_id.GetUserInfoById;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_prd.GETUserInfoByPrdResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.get_user_info_by_prd.GetUserInfoByPrd;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info.PUTUpdateProfilePayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info.PUTUpdateProfileResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.user_info.update_user_info.UpdateProfile;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;
import java.util.List;

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
    private final GetUserInfoByPrd getUserInfoByPrd;
    private final GETUserByShopName getUserByShopName;

    @RolesAllowed("USER")
    @PutMapping("/user/profile")
    public PUTUpdateProfileResponse updateProfile (@RequestBody PUTUpdateProfilePayload payload, Principal principal) {
        return updateProfile.updateProfile(payload, principal);
    }

    @RolesAllowed("USER")
    @PostMapping("/user/cart")
    public CartResponse addItemToCart (@RequestBody POSTItemToCartPayload payload, Principal principal) {
        return addItemToCart.addItemToCart(payload, principal);
    }

    @RolesAllowed("USER")
    @PutMapping("/user/cart")
    public CartResponse changeNumberItems (@RequestBody PUTNumberItemsPayload payload, Principal principal) {
        try {
            return changeNumberItems.changeNumberItems(payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return CartResponse.builder().build();
    }

    @RolesAllowed("USER")
    @GetMapping("/user/{userId}/cart")
    public CartResponse getAllItems (@PathVariable("userId") String userId, Principal principal) {
        return getAllItems.getAllItemsInCart(userId, principal);
    }

    @RolesAllowed("USER")
    @DeleteMapping("/user/cart")
    public CartResponse deleteItem (@RequestBody DELETEItemInCartPayload payload, Principal principal) {
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
    public PUTRequestShopResponse requestShop (@PathVariable("userId") String userId, @RequestBody PUTRequestShopPayload payload, Principal principal) {
        try {
            return requestShop.requestShop(userId, payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTRequestShopResponse.builder().build();
    }

    @RolesAllowed("USER")
    @PostMapping("/user/userInfoByPrd/{adminId}")
    public GETUserInfoByPrdResponse getInfo (@PathVariable("adminId") String adminId, @RequestBody List<String> userIds, Principal principal) {
        try {
            return getUserInfoByPrd.getUserInfoByPrd(adminId, userIds, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return GETUserInfoByPrdResponse.builder().build();
    }

    @RolesAllowed("USER")
    @GetMapping("/user/{userId}/shop/{shopName}")
    public Response getUserByShopName (@PathVariable ("userId") String userId, @PathVariable ("shopName") String shopName, Principal principal) {
        return getUserByShopName.getUserByShopName(userId, shopName, principal);
    }
}

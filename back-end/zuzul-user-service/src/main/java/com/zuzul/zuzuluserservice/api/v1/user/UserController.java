package com.zuzul.zuzuluserservice.api.v1.user;

import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.AddItemToCart;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.POSTItemToCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.add_item.POSTItemToCartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.ChangeNumberItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.change_number_of_items.PUTNumberItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GETAllItemsPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GETAllItemsResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.get_all_items.GetAllItems;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DELETEItemInCartPayload;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DELETEItemInCartResponse;
import com.zuzul.zuzuluserservice.api.v1.user.cart.remove_item.DeleteItem;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.PUTUpdateProfilePayload;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.PUTUpdateProfileResponse;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.UpdateProfile;
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

    @RolesAllowed("TEST_ROLE")
    @PutMapping("/user/profile")
    public PUTUpdateProfileResponse updateProfile (PUTUpdateProfilePayload payload, Principal principal) {
        return updateProfile.updateProfile(payload, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @PostMapping("/user/cart")
    public POSTItemToCartResponse addItemToCart (POSTItemToCartPayload payload, Principal principal) {
        return addItemToCart.addItemToCart(payload, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @PutMapping("/user/cart")
    public PUTNumberItemsResponse changeNumberItems (PUTNumberItemsPayload payload, Principal principal) {
        return changeNumberItems.changeNumberItems(payload, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @GetMapping("/user/cart")
    public GETAllItemsResponse getAllItems (GETAllItemsPayload payload, Principal principal) {
        return getAllItems.getAllItemsInCart(payload, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @DeleteMapping("/user/cart")
    public DELETEItemInCartResponse deleteItem (DELETEItemInCartPayload payload, Principal principal) {
        return deleteItem.deleteItemInCart(payload, principal);
    }
}

package com.zuzul.zuzuluserservice.api.v1.user.update_profile.address;

import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.create_address.POSTCreateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.get_all_address.GETAllAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.get_all_address.GETAllAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.get_all_address.GetAllAddress;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.remove_address.DELETEAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.remove_address.DELETEAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.remove_address.DeleteAddress;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.update_address.PUTUpdateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.update_address.PUTUpdateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.update_address.UpdateAddress;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.security.Principal;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class AddressController {
    private final CreateAddress createAddress;
    private final GetAllAddress getAllAddress;
    private final UpdateAddress updateAddress;
    private final DeleteAddress deleteAddress;

    @RolesAllowed("TEST_ROLE")
    @PostMapping("/user/address")
    public POSTCreateAddressResponse createAddress(POSTCreateAddressPayload payload, Principal principal) {
        return createAddress.createAddress(payload, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @GetMapping("/user/address")
    public GETAllAddressResponse getAllAddress(GETAllAddressPayload payload, Principal principal) {
        return getAllAddress.getAllAddress(payload, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @PutMapping("/user/address")
    public PUTUpdateAddressResponse updateAddress(PUTUpdateAddressPayload payload, Principal principal) {
        return updateAddress.updateAddress(payload, principal);
    }

    @RolesAllowed("TEST_ROLE")
    @DeleteMapping("/user/address")
    public DELETEAddressResponse deleteAddress(DELETEAddressPayload payload, Principal principal) {
        return deleteAddress.deleteAddress(payload, principal);
    }
}

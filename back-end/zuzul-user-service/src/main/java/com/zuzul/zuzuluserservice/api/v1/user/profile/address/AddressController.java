package com.zuzul.zuzuluserservice.api.v1.user.profile.address;

import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.ChangeTypeAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.PUTChangeTypeAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type.PUTChangeTypeAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.CreateAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address.POSTCreateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_address_by_id.GETAddressByIdResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_address_by_id.GetAddressById;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.AddressModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.GETAllAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.GETAllAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address.GetAllAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DELETEAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DELETEAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address.DeleteAddress;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.PUTUpdateAddressPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.PUTUpdateAddressResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address.UpdateAddress;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Path;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class AddressController {
    private final CreateAddress createAddress;
    private final GetAllAddress getAllAddress;
    private final UpdateAddress updateAddress;
    private final DeleteAddress deleteAddress;
    private final GetAddressById getAddressById;
    private final ChangeTypeAddress changeTypeAddress;

    @RolesAllowed("USER")
    @PostMapping("/user/address")
    public POSTCreateAddressResponse createAddress(@RequestBody POSTCreateAddressPayload payload, Principal principal) {
        return createAddress.createAddress(payload, principal);
    }

    @RolesAllowed("USER")
    @GetMapping("/user/address/{userId}")
    public List<AddressModel> getAllAddress(@PathVariable("userId") String userId, Principal principal) {
        return getAllAddress.getAllAddress(userId, principal);
    }

    @RolesAllowed("USER")
    @PutMapping("/user/address")
    public PUTUpdateAddressResponse updateAddress(@RequestBody PUTUpdateAddressPayload payload, Principal principal) {
        return updateAddress.updateAddress(payload, principal);
    }

    @RolesAllowed("USER")
    @DeleteMapping("/user/address")
    public DELETEAddressResponse deleteAddress(@RequestBody DELETEAddressPayload payload, Principal principal) {
        return deleteAddress.deleteAddress(payload, principal);
    }

    @RolesAllowed("USER")
    @GetMapping("/user/{userId}/address/{addressId}")
    public GETAddressByIdResponse getAddressById (@PathVariable("userId") String userId,
                                                  @PathVariable("addressId") String addressId,
                                                  Principal principal) {
        try {
            return getAddressById.getAddressById(userId, addressId, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return GETAddressByIdResponse.builder().build();
    }

    @RolesAllowed("USER")
    @PutMapping("/user/address/setDefault")
    public PUTChangeTypeAddressResponse updateDefault(@RequestBody PUTChangeTypeAddressPayload payload,
                                                      Principal principal) {
        try {
            return changeTypeAddress.setDefault(payload, principal);
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
        return PUTChangeTypeAddressResponse.builder().build();
    }
}

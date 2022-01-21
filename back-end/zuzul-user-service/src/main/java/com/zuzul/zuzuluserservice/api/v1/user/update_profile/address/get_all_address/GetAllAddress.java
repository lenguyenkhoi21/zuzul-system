package com.zuzul.zuzuluserservice.api.v1.user.update_profile.address.get_all_address;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetAllAddress {
    private final AddressRepository addressRepository;

    public GETAllAddressResponse getAllAddress (GETAllAddressPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            List<Address> addresses = addressRepository.findAllByUserId(payload.getUserId());

            List<AddressModel> addressModels = new ArrayList<>();

            addresses.forEach(address ->
                    addressModels.add(
                     AddressModel
                             .builder()
                             .addressId(address.getAddressId())
                             .userName(address.getUserName())
                             .userPhone(address.getUserPhone())
                             .userWard(address.getUserWard())
                             .userCity(address.getUserCity())
                             .userDistinct(address.getUserDistinct())
                             .type(address.getType())
                             .detailsAddress(address.getDetailsAddress())
                             .build()
                    ));

            return GETAllAddressResponse
                    .builder()
                    .addressList(addressModels)
                    .status("SUCCESS")
                    .build();
        }
        return GETAllAddressResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

package com.zuzul.zuzuluserservice.api.v1.user.profile.address.update_address;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UpdateAddress {
    private final AddressRepository addressRepository;

    public PUTUpdateAddressResponse updateAddress (PUTUpdateAddressPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            Address address = addressRepository.findAddressByAddressId(payload.getAddressId());

            Address uploadedAddress = Address
                    .builder()
                    .addressId(address.getAddressId())
                    .id(address.getId())
                    .userDistinct(payload.getUserDistinct())
                    .userWard(payload.getUserWard())
                    .userCity(payload.getUserCity())
                    .detailsAddress(payload.getDetailsAddress())
                    .userPhone(payload.getUserPhone())
                    .userName(payload.getUserName())
                    .userId(address.getUserId())
                    .type(address.isType())
                    .build();

            addressRepository.save(uploadedAddress);

            return PUTUpdateAddressResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return PUTUpdateAddressResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

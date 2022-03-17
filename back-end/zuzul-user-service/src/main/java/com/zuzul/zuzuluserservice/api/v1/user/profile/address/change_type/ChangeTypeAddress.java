package com.zuzul.zuzuluserservice.api.v1.user.profile.address.change_type;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class ChangeTypeAddress {
    private final AddressRepository addressRepository;

    public PUTChangeTypeAddressResponse setDefault (PUTChangeTypeAddressPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            Address address = addressRepository.findAddressByAddressId(payload.getAddressId());

            Address defaultAddress = addressRepository.findAddressByUserIdAndType(payload.getUserId(), true);

            address.setType(true);
            defaultAddress.setType(false);

            addressRepository.save(address);
            addressRepository.save(defaultAddress);

            return PUTChangeTypeAddressResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return PUTChangeTypeAddressResponse
                .builder().build();
    }
}

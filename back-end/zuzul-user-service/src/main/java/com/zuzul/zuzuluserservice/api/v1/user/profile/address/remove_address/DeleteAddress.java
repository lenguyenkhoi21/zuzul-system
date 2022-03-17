package com.zuzul.zuzuluserservice.api.v1.user.profile.address.remove_address;

import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class DeleteAddress {
    private final AddressRepository addressRepository;

    public DELETEAddressResponse deleteAddress (DELETEAddressPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {
            addressRepository.deleteAddressByAddressId(payload.getAddressId());

            return DELETEAddressResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return DELETEAddressResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

package com.zuzul.zuzuluserservice.api.v1.user.profile.address.create_address;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import com.zuzul.zuzuluserservice.common.ultis.FunctionalUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class CreateAddress {
    private final AddressRepository addressRepository;

    public POSTCreateAddressResponse createAddress (POSTCreateAddressPayload payload, Principal principal) {
        if (principal.getName().equals(payload.getUserId())) {

            String addressId = FunctionalUtils.generateAddressUUID();

            Address address = Address
                    .builder()
                    .addressId(addressId)
                    .userName(payload.getUserName())
                    .userPhone(payload.getUserPhone())
                    .userWard(payload.getUserWard())
                    .userCity(payload.getUserCity())
                    .userDistinct(payload.getUserDistinct())
                    .detailsAddress(payload.getDetailsAddress())
                    .type(payload.isType())
                    .userId(payload.getUserId())
                    .build();

            addressRepository.save(address);

            return POSTCreateAddressResponse
                    .builder()
                    .status("SUCCESS")
                    .build();
        }
        return POSTCreateAddressResponse
                .builder()
                .status("FAIL")
                .build();
    }
}

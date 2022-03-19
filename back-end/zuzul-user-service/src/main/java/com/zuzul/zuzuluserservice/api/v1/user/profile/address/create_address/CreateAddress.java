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
            Address address = null;
            if (addressRepository.findAllByUserId(payload.getUserId()).size() == 0) {
                address = Address
                        .builder()
                        .addressId(addressId)
                        .userName(payload.getUserName())
                        .userPhone(payload.getUserPhone())
                        .userWard(payload.getUserWard())
                        .userCity(payload.getUserCity())
                        .userDistinct(payload.getUserDistinct())
                        .detailsAddress(payload.getDetailsAddress())
                        .type(true)
                        .userId(payload.getUserId())
                        .build();
            }
            else {
                address = Address
                        .builder()
                        .addressId(addressId)
                        .userName(payload.getUserName())
                        .userPhone(payload.getUserPhone())
                        .userWard(payload.getUserWard())
                        .userCity(payload.getUserCity())
                        .userDistinct(payload.getUserDistinct())
                        .detailsAddress(payload.getDetailsAddress())
                        .type(false)
                        .userId(payload.getUserId())
                        .build();
            }

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

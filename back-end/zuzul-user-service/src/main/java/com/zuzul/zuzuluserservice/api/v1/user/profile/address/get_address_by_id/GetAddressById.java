package com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_address_by_id;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import com.zuzul.zuzuluserservice.common.repo.mongodb.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class GetAddressById {
    private final AddressRepository addressRepository;

    public GETAddressByIdResponse getAddressById (String userId, String addressId, Principal principal) {
        if (principal.getName().equals(userId)) {
            Address address = addressRepository.findAddressByAddressId(addressId);

            return GETAddressByIdResponse
                    .builder()
                    .userName(address.getUserName())
                    .userPhone(address.getUserPhone())
                    .userWard(address.getUserWard())
                    .userCity(address.getUserCity())
                    .userDistinct(address.getUserDistinct())
                    .type(address.isType())
                    .detailsAddress(address.getDetailsAddress())
                    .build();
        }
        return GETAddressByIdResponse.builder().build();
    }
}

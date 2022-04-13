package com.zuzul.zuzuluserservice.api.v1.user.profile.address.get_all_address;

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

    public List<AddressModel> getAllAddress (String userId, Principal principal) {
        if (principal.getName().equals(userId)) {
            Address defaultAddress = addressRepository.findAddressByUserIdAndType(userId, true);
            List<Address> addresses = addressRepository.findAllByUserIdAndType(userId, false);

            if (defaultAddress == null) {
                return new ArrayList<>();
            }

            List<AddressModel> addressModels = new ArrayList<>();

            addressModels.add(AddressModel
                    .builder()
                    .addressId(defaultAddress.getAddressId())
                    .userName(defaultAddress.getUserName())
                    .userPhone(defaultAddress.getUserPhone())
                    .userWard(defaultAddress.getUserWard())
                    .userCity(defaultAddress.getUserCity())
                    .userDistinct(defaultAddress.getUserDistinct())
                    .type(defaultAddress.isType())
                    .detailsAddress(defaultAddress.getDetailsAddress())
                    .build()
            );
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
                             .type(address.isType())
                             .detailsAddress(address.getDetailsAddress())
                             .build()
                    ));

            return addressModels;
        }
        return new ArrayList<>();
    }
}

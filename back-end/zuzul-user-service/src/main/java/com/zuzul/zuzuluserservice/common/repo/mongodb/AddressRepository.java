package com.zuzul.zuzuluserservice.common.repo.mongodb;

import com.zuzul.zuzuluserservice.common.model.mongodb.Address;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends MongoRepository<Address, String> {
    List<Address> findAllByUserId(String id);
    Address findAddressByAddressId(String id);
    long deleteAddressByAddressId(String id);
}

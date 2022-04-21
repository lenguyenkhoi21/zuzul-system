package com.zuzul.zuzuluserservice.common.repo.mongodb;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo, String> {
    UserInfo findUserInfoByUserId (String id);
    List<UserInfo> findAllBySendRequest(boolean request);
    @Query("{'userShopName' : { $regex : ?0, $options: 'i'}}")
    List<UserInfo> findAllByUserShopNameFilter(String shopName);
}

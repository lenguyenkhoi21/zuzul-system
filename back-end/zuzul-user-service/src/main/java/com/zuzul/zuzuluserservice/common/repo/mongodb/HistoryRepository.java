package com.zuzul.zuzuluserservice.common.repo.mongodb;

import com.zuzul.zuzuluserservice.common.model.mongodb.History;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends MongoRepository<History, String> {
    List<History> findAllByUserId (String userId);
    History findByHistoryId(String id);
    long deleteHistoryByHistoryId (String historyId);
}

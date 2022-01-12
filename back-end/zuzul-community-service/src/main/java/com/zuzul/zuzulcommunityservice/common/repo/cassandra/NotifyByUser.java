package com.zuzul.zuzulcommunityservice.common.repo.cassandra;

import com.zuzul.zuzulcommunityservice.common.model.cassandra.NotifyByUserKey;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotifyByUser
        extends CassandraRepository<NotifyByUserKey, NotifyByUserKey> {


}

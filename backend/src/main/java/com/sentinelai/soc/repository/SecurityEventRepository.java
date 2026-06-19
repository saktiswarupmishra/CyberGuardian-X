package com.sentinelai.soc.repository;

import com.sentinelai.soc.model.SecurityEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.Instant;
import java.util.List;

public interface SecurityEventRepository extends MongoRepository<SecurityEvent, String> {
    Page<SecurityEvent> findByEventType(String eventType, Pageable pageable);
    List<SecurityEvent> findByTimestampAfter(Instant after);
    long countByEventType(String eventType);
    long countByTimestampAfter(Instant after);
}

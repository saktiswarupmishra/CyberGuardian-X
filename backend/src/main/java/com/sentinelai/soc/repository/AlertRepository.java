package com.sentinelai.soc.repository;

import com.sentinelai.soc.model.Alert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.Instant;
import java.util.List;

public interface AlertRepository extends MongoRepository<Alert, String> {
    Page<Alert> findBySeverity(String severity, Pageable pageable);
    Page<Alert> findByAcknowledged(boolean acknowledged, Pageable pageable);
    List<Alert> findByTimestampAfter(Instant after);
    long countBySeverity(String severity);
    long countByAcknowledged(boolean acknowledged);
    long countByTimestampAfter(Instant after);
}

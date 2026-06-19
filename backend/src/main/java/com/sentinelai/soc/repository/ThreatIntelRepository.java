package com.sentinelai.soc.repository;

import com.sentinelai.soc.model.ThreatIntel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ThreatIntelRepository extends MongoRepository<ThreatIntel, String> {
    Optional<ThreatIntel> findByIocValue(String iocValue);
    Page<ThreatIntel> findByIocType(String iocType, Pageable pageable);
    Page<ThreatIntel> findByThreatType(String threatType, Pageable pageable);
    List<ThreatIntel> findByActiveTrue();
    long countByThreatType(String threatType);
    long countByActiveTrue();
}

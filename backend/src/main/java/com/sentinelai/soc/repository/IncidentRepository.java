package com.sentinelai.soc.repository;

import com.sentinelai.soc.model.Incident;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IncidentRepository extends MongoRepository<Incident, String> {
    Page<Incident> findBySeverity(String severity, Pageable pageable);
    Page<Incident> findByStatus(String status, Pageable pageable);
    Page<Incident> findBySeverityAndStatus(String severity, String status, Pageable pageable);
    List<Incident> findByStatusNot(String status);
    long countBySeverity(String severity);
    long countByStatus(String status);
}

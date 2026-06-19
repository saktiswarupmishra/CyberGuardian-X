package com.sentinelai.soc.controller;

import com.sentinelai.soc.model.Incident;
import com.sentinelai.soc.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentRepository incidentRepository;

    @GetMapping
    public ResponseEntity<Page<Incident>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String severity,
            @RequestParam(required = false) String status) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Incident> incidents;
        if (severity != null && status != null) {
            incidents = incidentRepository.findBySeverityAndStatus(severity, status, pageRequest);
        } else if (severity != null) {
            incidents = incidentRepository.findBySeverity(severity, pageRequest);
        } else if (status != null) {
            incidents = incidentRepository.findByStatus(status, pageRequest);
        } else {
            incidents = incidentRepository.findAll(pageRequest);
        }
        return ResponseEntity.ok(incidents);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getById(@PathVariable String id) {
        return incidentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Incident> create(@RequestBody Incident incident) {
        return ResponseEntity.ok(incidentRepository.save(incident));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Incident> update(@PathVariable String id, @RequestBody Incident incident) {
        incident.setId(id);
        return ResponseEntity.ok(incidentRepository.save(incident));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        incidentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

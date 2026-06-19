package com.sentinelai.soc.controller;

import com.sentinelai.soc.model.Alert;
import com.sentinelai.soc.repository.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertController {

    private final AlertRepository alertRepository;

    @GetMapping
    public ResponseEntity<Page<Alert>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String severity) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"));
        Page<Alert> alerts = severity != null
                ? alertRepository.findBySeverity(severity, pageRequest)
                : alertRepository.findAll(pageRequest);
        return ResponseEntity.ok(alerts);
    }

    @PostMapping("/{id}/acknowledge")
    public ResponseEntity<Alert> acknowledge(@PathVariable String id) {
        return alertRepository.findById(id)
                .map(alert -> {
                    alert.setAcknowledged(true);
                    alert.setAcknowledgedAt(Instant.now());
                    return ResponseEntity.ok(alertRepository.save(alert));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

package com.sentinelai.soc.controller;

import com.sentinelai.soc.model.ThreatIntel;
import com.sentinelai.soc.repository.ThreatIntelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/threats")
@RequiredArgsConstructor
public class ThreatController {

    private final ThreatIntelRepository threatIntelRepository;

    @GetMapping
    public ResponseEntity<Page<ThreatIntel>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String type) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "lastSeen"));
        Page<ThreatIntel> threats = type != null
                ? threatIntelRepository.findByThreatType(type, pageRequest)
                : threatIntelRepository.findAll(pageRequest);
        return ResponseEntity.ok(threats);
    }

    @GetMapping("/ioc/{value}")
    public ResponseEntity<ThreatIntel> lookupIOC(@PathVariable String value) {
        return threatIntelRepository.findByIocValue(value)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

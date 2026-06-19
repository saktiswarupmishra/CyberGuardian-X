package com.sentinelai.soc.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "security_events")
public class SecurityEvent {

    @Id
    private String id;
    private String eventType;
    private String severity;
    private String source;
    private String sourceIp;
    private String destinationIp;
    private String country;
    private double latitude;
    private double longitude;
    private String message;
    private Map<String, Object> metadata;
    private Instant timestamp;
}


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
@Document(collection = "threats")
public class ThreatIntel {

    @Id
    private String id;
    private String iocType;    // IP, DOMAIN, HASH, URL, EMAIL
    private String iocValue;
    private String source;     // VIRUSTOTAL, ABUSEIPDB, ALIENVAULT, INTERNAL
    private double riskScore;
    private String threatType; // MALWARE, PHISHING, C2, BOTNET, RANSOMWARE
    private String malwareFamily;
    private String threatActor;
    private List<String> tags;
    private List<String> relatedIOCs;
    private Map<String, Object> enrichmentData;
    private List<MitreMapping> mitreMappings;
    private boolean active;
    private Instant firstSeen;
    private Instant lastSeen;
    private Instant createdAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MitreMapping {
        private String tacticId;
        private String tacticName;
        private String techniqueId;
        private String techniqueName;
    }
}

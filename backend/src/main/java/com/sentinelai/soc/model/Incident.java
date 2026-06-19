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
@Document(collection = "incidents")
public class Incident {

    @Id
    private String id;
    private String title;
    private String description;
    private String severity; // CRITICAL, HIGH, MEDIUM, LOW
    private String status;   // OPEN, INVESTIGATING, CONTAINED, RESOLVED, CLOSED
    private String type;     // MALWARE, DDOS, BRUTE_FORCE, SQL_INJECTION, PHISHING, INSIDER_THREAT, RANSOMWARE
    private String assignedTo;
    private String assignedAgent;
    private List<TimelineEntry> timeline;
    private List<String> affectedAssets;
    private List<String> relatedIOCs;
    private List<String> evidence;
    private Map<String, Object> mitreTactics;
    private String aiSummary;
    private String rootCause;
    private List<ResponseAction> responseActions;
    private double riskScore;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant resolvedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimelineEntry {
        private Instant timestamp;
        private String event;
        private String source;
        private String severity;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseAction {
        private String action;
        private String status;
        private String performedBy;
        private Instant timestamp;
        private Map<String, Object> details;
    }
}

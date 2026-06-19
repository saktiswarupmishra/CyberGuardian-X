package com.sentinelai.soc.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "alerts")
public class Alert {

    @Id
    private String id;
    private String title;
    private String description;
    private String type;      // INTRUSION, MALWARE, ANOMALY, POLICY_VIOLATION, VULNERABILITY
    private String severity;  // CRITICAL, HIGH, MEDIUM, LOW, INFO
    private String source;    // WAZUH, SURICATA, ZEEK, YARA, ML_ENGINE, AI_AGENT
    private String sourceIp;
    private String destinationIp;
    private int sourcePort;
    private int destinationPort;
    private String protocol;
    private boolean acknowledged;
    private String acknowledgedBy;
    private String relatedIncidentId;
    private Map<String, Object> rawData;
    private double confidenceScore;
    private Instant timestamp;
    private Instant acknowledgedAt;
}

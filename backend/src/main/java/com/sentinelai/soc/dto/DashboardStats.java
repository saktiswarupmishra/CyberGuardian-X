package com.sentinelai.soc.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private long totalIncidents;
    private long activeIncidents;
    private long criticalAlerts;
    private long highAlerts;
    private long mediumAlerts;
    private long lowAlerts;
    private long totalThreats;
    private long activeThreats;
    private long totalVulnerabilities;
    private long criticalVulnerabilities;
    private double securityScore;
    private double mttd; // Mean Time to Detect (hours)
    private double mttr; // Mean Time to Respond (hours)
    private Map<String, Long> alertsBySeverity;
    private Map<String, Long> incidentsByType;
    private List<Map<String, Object>> threatTrends;
    private List<Map<String, Object>> recentAlerts;
    private List<AgentStatus> agentStatuses;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AgentStatus {
        private String name;
        private String type;
        private String status; // ONLINE, BUSY, OFFLINE, ERROR
        private long tasksCompleted;
        private long tasksPending;
        private double successRate;
    }
}

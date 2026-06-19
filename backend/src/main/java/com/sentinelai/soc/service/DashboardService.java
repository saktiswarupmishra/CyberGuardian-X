package com.sentinelai.soc.service;

import com.sentinelai.soc.dto.DashboardStats;
import com.sentinelai.soc.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncidentRepository incidentRepository;
    private final AlertRepository alertRepository;
    private final ThreatIntelRepository threatIntelRepository;
    private final VulnerabilityRepository vulnerabilityRepository;
    private final SecurityEventRepository securityEventRepository;

    public DashboardStats getStats() {
        Instant last24h = Instant.now().minus(24, ChronoUnit.HOURS);

        Map<String, Long> alertsBySeverity = new LinkedHashMap<>();
        alertsBySeverity.put("CRITICAL", alertRepository.countBySeverity("CRITICAL"));
        alertsBySeverity.put("HIGH", alertRepository.countBySeverity("HIGH"));
        alertsBySeverity.put("MEDIUM", alertRepository.countBySeverity("MEDIUM"));
        alertsBySeverity.put("LOW", alertRepository.countBySeverity("LOW"));

        Map<String, Long> incidentsByType = new LinkedHashMap<>();
        incidentsByType.put("MALWARE", incidentRepository.countBySeverity("MALWARE"));
        incidentsByType.put("DDOS", incidentRepository.countBySeverity("DDOS"));
        incidentsByType.put("BRUTE_FORCE", incidentRepository.countBySeverity("BRUTE_FORCE"));
        incidentsByType.put("PHISHING", incidentRepository.countBySeverity("PHISHING"));

        List<DashboardStats.AgentStatus> agentStatuses = getAgentStatuses();

        return DashboardStats.builder()
                .totalIncidents(incidentRepository.count())
                .activeIncidents(incidentRepository.countByStatus("OPEN") + incidentRepository.countByStatus("INVESTIGATING"))
                .criticalAlerts(alertRepository.countBySeverity("CRITICAL"))
                .highAlerts(alertRepository.countBySeverity("HIGH"))
                .mediumAlerts(alertRepository.countBySeverity("MEDIUM"))
                .lowAlerts(alertRepository.countBySeverity("LOW"))
                .totalThreats(threatIntelRepository.count())
                .activeThreats(threatIntelRepository.countByActiveTrue())
                .totalVulnerabilities(vulnerabilityRepository.count())
                .criticalVulnerabilities(vulnerabilityRepository.countBySeverity("CRITICAL"))
                .securityScore(calculateSecurityScore())
                .mttd(2.4)
                .mttr(4.8)
                .alertsBySeverity(alertsBySeverity)
                .incidentsByType(incidentsByType)
                .agentStatuses(agentStatuses)
                .build();
    }

    private double calculateSecurityScore() {
        long criticalVulns = vulnerabilityRepository.countBySeverity("CRITICAL");
        long highVulns = vulnerabilityRepository.countBySeverity("HIGH");
        long activeIncidents = incidentRepository.countByStatus("OPEN");
        long criticalAlerts = alertRepository.countBySeverity("CRITICAL");

        double score = 100.0;
        score -= criticalVulns * 5;
        score -= highVulns * 2;
        score -= activeIncidents * 3;
        score -= criticalAlerts * 4;

        return Math.max(0, Math.min(100, score));
    }

    private List<DashboardStats.AgentStatus> getAgentStatuses() {
        return List.of(
            DashboardStats.AgentStatus.builder().name("Security Coordinator").type("COORDINATOR").status("ONLINE").tasksCompleted(1247).tasksPending(3).successRate(99.2).build(),
            DashboardStats.AgentStatus.builder().name("Log Analysis").type("LOG_ANALYSIS").status("ONLINE").tasksCompleted(8934).tasksPending(12).successRate(97.8).build(),
            DashboardStats.AgentStatus.builder().name("Threat Intelligence").type("THREAT_INTEL").status("ONLINE").tasksCompleted(3421).tasksPending(5).successRate(98.5).build(),
            DashboardStats.AgentStatus.builder().name("Incident Investigation").type("INVESTIGATION").status("BUSY").tasksCompleted(892).tasksPending(8).successRate(96.3).build(),
            DashboardStats.AgentStatus.builder().name("Incident Response").type("RESPONSE").status("ONLINE").tasksCompleted(456).tasksPending(2).successRate(99.1).build(),
            DashboardStats.AgentStatus.builder().name("Vulnerability Assessment").type("VULNERABILITY").status("ONLINE").tasksCompleted(2134).tasksPending(15).successRate(97.2).build(),
            DashboardStats.AgentStatus.builder().name("Compliance Monitor").type("COMPLIANCE").status("ONLINE").tasksCompleted(1876).tasksPending(4).successRate(98.9).build(),
            DashboardStats.AgentStatus.builder().name("Digital Forensics").type("FORENSICS").status("ONLINE").tasksCompleted(324).tasksPending(1).successRate(99.5).build(),
            DashboardStats.AgentStatus.builder().name("Security Reporter").type("REPORTER").status("ONLINE").tasksCompleted(567).tasksPending(0).successRate(100.0).build(),
            DashboardStats.AgentStatus.builder().name("Security Copilot").type("COPILOT").status("ONLINE").tasksCompleted(4523).tasksPending(0).successRate(98.7).build()
        );
    }
}

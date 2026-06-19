package com.sentinelai.soc.config;

import com.sentinelai.soc.model.*;
import com.sentinelai.soc.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final IncidentRepository incidentRepository;
    private final AlertRepository alertRepository;
    private final ThreatIntelRepository threatIntelRepository;
    private final VulnerabilityRepository vulnerabilityRepository;
    private final SecurityEventRepository securityEventRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already seeded, skipping...");
            return;
        }
        log.info("Seeding database with demo data...");
        seedUsers();
        seedIncidents();
        seedAlerts();
        seedThreats();
        seedVulnerabilities();
        seedSecurityEvents();
        log.info("Database seeding complete!");
    }

    private void seedUsers() {
        userRepository.saveAll(List.of(
            User.builder().email("admin@sentinelai.com").password(passwordEncoder.encode("Admin@2026")).fullName("Alex Morgan").role("ADMIN").enabled(true).createdAt(Instant.now()).build(),
            User.builder().email("analyst@sentinelai.com").password(passwordEncoder.encode("Analyst@2026")).fullName("Sarah Chen").role("ANALYST").enabled(true).createdAt(Instant.now()).build(),
            User.builder().email("ciso@sentinelai.com").password(passwordEncoder.encode("Ciso@2026")).fullName("James Wilson").role("CISO").enabled(true).createdAt(Instant.now()).build()
        ));
    }

    private void seedIncidents() {
        String[] severities = {"CRITICAL", "HIGH", "MEDIUM", "LOW"};
        String[] statuses = {"OPEN", "INVESTIGATING", "CONTAINED", "RESOLVED", "CLOSED"};
        String[] types = {"MALWARE", "DDOS", "BRUTE_FORCE", "SQL_INJECTION", "PHISHING", "INSIDER_THREAT", "RANSOMWARE", "PRIVILEGE_ESCALATION"};
        String[][] titles = {
            {"Ransomware Attack Detected on File Server", "CRITICAL"},
            {"DDoS Attack Targeting Web Application", "CRITICAL"},
            {"Brute Force Login Attempts from Eastern Europe", "HIGH"},
            {"SQL Injection Attempt on API Gateway", "HIGH"},
            {"Suspicious Lateral Movement Detected", "CRITICAL"},
            {"Phishing Campaign Targeting Finance Department", "HIGH"},
            {"Unauthorized Privilege Escalation", "CRITICAL"},
            {"Malware C2 Communication Detected", "HIGH"},
            {"Data Exfiltration Attempt via DNS Tunneling", "CRITICAL"},
            {"Insider Threat - Unusual Data Access Pattern", "MEDIUM"},
            {"Credential Stuffing Attack on Auth Service", "HIGH"},
            {"Cryptomining Malware on Cloud Instance", "MEDIUM"},
            {"Suspicious PowerShell Execution", "MEDIUM"},
            {"Anomalous Network Traffic Spike", "LOW"},
            {"Failed MFA Bypass Attempt", "MEDIUM"}
        };

        List<Incident> incidents = new ArrayList<>();
        for (int i = 0; i < titles.length; i++) {
            Instant created = Instant.now().minus(ThreadLocalRandom.current().nextInt(1, 72), ChronoUnit.HOURS);
            incidents.add(Incident.builder()
                .title(titles[i][0])
                .description("Automated detection by SentinelAI agent - " + titles[i][0])
                .severity(titles[i][1])
                .status(statuses[ThreadLocalRandom.current().nextInt(statuses.length)])
                .type(types[ThreadLocalRandom.current().nextInt(types.length)])
                .assignedAgent("AI Agent")
                .riskScore(ThreadLocalRandom.current().nextDouble(40, 100))
                .aiSummary("AI-generated investigation summary for: " + titles[i][0])
                .createdAt(created)
                .updatedAt(created.plus(ThreadLocalRandom.current().nextInt(1, 24), ChronoUnit.HOURS))
                .timeline(List.of(
                    Incident.TimelineEntry.builder().timestamp(created).event("Incident detected").source("AI Agent").severity(titles[i][1]).build(),
                    Incident.TimelineEntry.builder().timestamp(created.plus(5, ChronoUnit.MINUTES)).event("Investigation initiated").source("Coordinator Agent").severity("INFO").build()
                ))
                .affectedAssets(List.of("srv-web-01", "srv-db-02"))
                .relatedIOCs(List.of("192.168.1." + ThreadLocalRandom.current().nextInt(1, 255)))
                .build());
        }
        incidentRepository.saveAll(incidents);
    }

    private void seedAlerts() {
        String[] types = {"INTRUSION", "MALWARE", "ANOMALY", "POLICY_VIOLATION", "VULNERABILITY"};
        String[] severities = {"CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"};
        String[] sources = {"WAZUH", "SURICATA", "ZEEK", "YARA", "ML_ENGINE", "AI_AGENT"};

        List<Alert> alerts = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            alerts.add(Alert.builder()
                .title("Alert " + (i + 1) + " - " + types[i % types.length] + " Detection")
                .description("Automated alert from security monitoring")
                .type(types[i % types.length])
                .severity(severities[i % severities.length])
                .source(sources[i % sources.length])
                .sourceIp(randomIP())
                .destinationIp("10.0.0." + ThreadLocalRandom.current().nextInt(1, 255))
                .sourcePort(ThreadLocalRandom.current().nextInt(1024, 65535))
                .destinationPort(List.of(80, 443, 22, 3389, 8080).get(i % 5))
                .protocol(List.of("TCP", "UDP", "HTTP", "HTTPS", "DNS").get(i % 5))
                .acknowledged(i > 30)
                .confidenceScore(ThreadLocalRandom.current().nextDouble(0.6, 1.0))
                .timestamp(Instant.now().minus(ThreadLocalRandom.current().nextInt(1, 168), ChronoUnit.HOURS))
                .build());
        }
        alertRepository.saveAll(alerts);
    }

    private void seedThreats() {
        List<ThreatIntel> threats = List.of(
            ThreatIntel.builder().iocType("IP").iocValue("185.220.101.34").source("ABUSEIPDB").riskScore(95).threatType("C2").malwareFamily("Cobalt Strike").active(true).firstSeen(Instant.now().minus(30, ChronoUnit.DAYS)).lastSeen(Instant.now()).createdAt(Instant.now()).tags(List.of("apt", "c2", "cobalt-strike")).build(),
            ThreatIntel.builder().iocType("HASH").iocValue("a1b2c3d4e5f6789012345678abcdef01").source("VIRUSTOTAL").riskScore(98).threatType("RANSOMWARE").malwareFamily("LockBit").active(true).firstSeen(Instant.now().minus(7, ChronoUnit.DAYS)).lastSeen(Instant.now()).createdAt(Instant.now()).tags(List.of("ransomware", "lockbit")).build(),
            ThreatIntel.builder().iocType("DOMAIN").iocValue("malware-c2.evil.com").source("ALIENVAULT").riskScore(92).threatType("MALWARE").malwareFamily("Emotet").active(true).firstSeen(Instant.now().minus(14, ChronoUnit.DAYS)).lastSeen(Instant.now()).createdAt(Instant.now()).tags(List.of("malware", "emotet")).build(),
            ThreatIntel.builder().iocType("IP").iocValue("45.33.32.156").source("INTERNAL").riskScore(78).threatType("BOTNET").active(true).firstSeen(Instant.now().minus(5, ChronoUnit.DAYS)).lastSeen(Instant.now()).createdAt(Instant.now()).tags(List.of("botnet", "scan")).build(),
            ThreatIntel.builder().iocType("URL").iocValue("https://phishing-site.example.com/login").source("INTERNAL").riskScore(88).threatType("PHISHING").active(true).firstSeen(Instant.now().minus(2, ChronoUnit.DAYS)).lastSeen(Instant.now()).createdAt(Instant.now()).tags(List.of("phishing", "credential-theft")).build()
        );
        threatIntelRepository.saveAll(threats);
    }

    private void seedVulnerabilities() {
        List<Vulnerability> vulns = List.of(
            Vulnerability.builder().cveId("CVE-2024-21762").title("Fortinet FortiOS RCE").description("Critical RCE vulnerability in FortiOS SSL VPN").severity("CRITICAL").cvssScore(9.8).status("OPEN").affectedAssets(List.of("fw-edge-01")).patchAvailable("Yes").publishedDate(Instant.now().minus(90, ChronoUnit.DAYS)).detectedAt(Instant.now().minus(5, ChronoUnit.DAYS)).build(),
            Vulnerability.builder().cveId("CVE-2024-3400").title("Palo Alto PAN-OS Command Injection").description("Critical command injection in GlobalProtect").severity("CRITICAL").cvssScore(10.0).status("IN_PROGRESS").affectedAssets(List.of("fw-pa-01")).patchAvailable("Yes").publishedDate(Instant.now().minus(60, ChronoUnit.DAYS)).detectedAt(Instant.now().minus(3, ChronoUnit.DAYS)).build(),
            Vulnerability.builder().cveId("CVE-2024-1709").title("ConnectWise ScreenConnect Auth Bypass").description("Authentication bypass in ScreenConnect").severity("HIGH").cvssScore(8.4).status("PATCHED").affectedAssets(List.of("srv-remote-01")).patchAvailable("Yes").publishedDate(Instant.now().minus(120, ChronoUnit.DAYS)).detectedAt(Instant.now().minus(10, ChronoUnit.DAYS)).build(),
            Vulnerability.builder().cveId("CVE-2024-27198").title("JetBrains TeamCity Auth Bypass").description("Critical authentication bypass").severity("CRITICAL").cvssScore(9.8).status("OPEN").affectedAssets(List.of("srv-ci-01")).patchAvailable("Yes").publishedDate(Instant.now().minus(45, ChronoUnit.DAYS)).detectedAt(Instant.now().minus(2, ChronoUnit.DAYS)).build(),
            Vulnerability.builder().cveId("CVE-2023-44487").title("HTTP/2 Rapid Reset DDoS").description("HTTP/2 protocol vulnerability allowing DDoS").severity("HIGH").cvssScore(7.5).status("MITIGATED").affectedAssets(List.of("lb-01", "lb-02")).patchAvailable("Yes").publishedDate(Instant.now().minus(200, ChronoUnit.DAYS)).detectedAt(Instant.now().minus(15, ChronoUnit.DAYS)).build()
        );
        vulnerabilityRepository.saveAll(vulns);
    }

    private void seedSecurityEvents() {
        String[] types = {"LOGIN_FAILURE", "FIREWALL_BLOCK", "MALWARE_DETECTED", "PORT_SCAN", "DNS_QUERY", "DATA_ACCESS"};
        String[] severities = {"CRITICAL", "HIGH", "MEDIUM", "LOW"};
        String[][] countries = {{"US", "37.0902", "-95.7129"}, {"CN", "35.8617", "104.1954"}, {"RU", "61.5240", "105.3188"}, {"DE", "51.1657", "10.4515"}, {"BR", "-14.235", "-51.9253"}, {"IN", "20.5937", "78.9629"}, {"GB", "55.3781", "-3.4360"}, {"KR", "35.9078", "127.7669"}};

        List<SecurityEvent> events = new ArrayList<>();
        for (int i = 0; i < 100; i++) {
            String[] country = countries[i % countries.length];
            events.add(SecurityEvent.builder()
                .eventType(types[i % types.length])
                .severity(severities[i % severities.length])
                .source("SIEM")
                .sourceIp(randomIP())
                .destinationIp("10.0.0." + ThreadLocalRandom.current().nextInt(1, 255))
                .country(country[0])
                .latitude(Double.parseDouble(country[1]))
                .longitude(Double.parseDouble(country[2]))
                .message("Security event detected from " + country[0])
                .timestamp(Instant.now().minus(ThreadLocalRandom.current().nextInt(1, 720), ChronoUnit.HOURS))
                .build());
        }
        securityEventRepository.saveAll(events);
    }

    private String randomIP() {
        return ThreadLocalRandom.current().nextInt(1, 255) + "." +
               ThreadLocalRandom.current().nextInt(0, 255) + "." +
               ThreadLocalRandom.current().nextInt(0, 255) + "." +
               ThreadLocalRandom.current().nextInt(1, 255);
    }
}

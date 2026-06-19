// Frontend API utility and types
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const AI_BASE = process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000';

export interface DashboardStats {
  totalIncidents: number;
  activeIncidents: number;
  criticalAlerts: number;
  highAlerts: number;
  mediumAlerts: number;
  lowAlerts: number;
  totalThreats: number;
  activeThreats: number;
  totalVulnerabilities: number;
  criticalVulnerabilities: number;
  securityScore: number;
  mttd: number;
  mttr: number;
  alertsBySeverity: Record<string, number>;
  incidentsByType: Record<string, number>;
  threatTrends: Array<Record<string, unknown>>;
  recentAlerts: Array<Record<string, unknown>>;
  agentStatuses: AgentStatus[];
}

export interface AgentStatus {
  name: string;
  type: string;
  status: string;
  tasksCompleted: number;
  tasksPending: number;
  successRate: number;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'INVESTIGATING' | 'CONTAINED' | 'RESOLVED' | 'CLOSED';
  type: string;
  assignedTo?: string;
  assignedAgent?: string;
  timeline: TimelineEntry[];
  affectedAssets: string[];
  relatedIOCs: string[];
  evidence: string[];
  aiSummary?: string;
  rootCause?: string;
  riskScore: number;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface TimelineEntry {
  timestamp: string;
  event: string;
  source: string;
  severity: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  source: string;
  sourceIp: string;
  destinationIp: string;
  sourcePort: number;
  destinationPort: number;
  protocol: string;
  acknowledged: boolean;
  confidenceScore: number;
  timestamp: string;
}

export interface ThreatIntel {
  id: string;
  iocType: string;
  iocValue: string;
  source: string;
  riskScore: number;
  threatType: string;
  malwareFamily?: string;
  threatActor?: string;
  tags: string[];
  active: boolean;
  firstSeen: string;
  lastSeen: string;
}

export interface Vulnerability {
  id: string;
  cveId: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  cvssScore: number;
  status: string;
  affectedAssets: string[];
  patchAvailable?: string;
  recommendation?: string;
  publishedDate: string;
  detectedAt: string;
}

export interface CopilotMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestedActions?: string[];
}

// Mock data generators for frontend-only demo mode
export function getMockDashboardStats(): DashboardStats {
  return {
    totalIncidents: 156,
    activeIncidents: 15,
    criticalAlerts: 8,
    highAlerts: 23,
    mediumAlerts: 45,
    lowAlerts: 67,
    totalThreats: 342,
    activeThreats: 47,
    totalVulnerabilities: 89,
    criticalVulnerabilities: 12,
    securityScore: 73,
    mttd: 2.4,
    mttr: 4.8,
    alertsBySeverity: { CRITICAL: 8, HIGH: 23, MEDIUM: 45, LOW: 67 },
    incidentsByType: { MALWARE: 34, DDOS: 12, BRUTE_FORCE: 28, PHISHING: 19, RANSOMWARE: 8, SQL_INJECTION: 15, INSIDER_THREAT: 6, PRIVILEGE_ESCALATION: 10 },
    threatTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
      threats: Math.floor(Math.random() * 30) + 10,
      incidents: Math.floor(Math.random() * 8) + 2,
      alerts: Math.floor(Math.random() * 50) + 20,
    })),
    recentAlerts: [],
    agentStatuses: [
      { name: 'Security Coordinator', type: 'COORDINATOR', status: 'ONLINE', tasksCompleted: 1247, tasksPending: 3, successRate: 99.2 },
      { name: 'Log Analysis', type: 'LOG_ANALYSIS', status: 'ONLINE', tasksCompleted: 8934, tasksPending: 12, successRate: 97.8 },
      { name: 'Threat Intelligence', type: 'THREAT_INTEL', status: 'ONLINE', tasksCompleted: 3421, tasksPending: 5, successRate: 98.5 },
      { name: 'Investigation', type: 'INVESTIGATION', status: 'BUSY', tasksCompleted: 892, tasksPending: 8, successRate: 96.3 },
      { name: 'Incident Response', type: 'RESPONSE', status: 'ONLINE', tasksCompleted: 456, tasksPending: 2, successRate: 99.1 },
      { name: 'Vulnerability', type: 'VULNERABILITY', status: 'ONLINE', tasksCompleted: 2134, tasksPending: 15, successRate: 97.2 },
      { name: 'Compliance', type: 'COMPLIANCE', status: 'ONLINE', tasksCompleted: 1876, tasksPending: 4, successRate: 98.9 },
      { name: 'Digital Forensics', type: 'FORENSICS', status: 'ONLINE', tasksCompleted: 324, tasksPending: 1, successRate: 99.5 },
      { name: 'Security Reporter', type: 'REPORTER', status: 'ONLINE', tasksCompleted: 567, tasksPending: 0, successRate: 100.0 },
      { name: 'Security Copilot', type: 'COPILOT', status: 'ONLINE', tasksCompleted: 4523, tasksPending: 0, successRate: 98.7 },
    ],
  };
}

export function getMockIncidents(): Incident[] {
  const types = ['MALWARE', 'DDOS', 'BRUTE_FORCE', 'SQL_INJECTION', 'PHISHING', 'INSIDER_THREAT', 'RANSOMWARE', 'PRIVILEGE_ESCALATION'];
  const severities: Incident['severity'][] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const statuses: Incident['status'][] = ['OPEN', 'INVESTIGATING', 'CONTAINED', 'RESOLVED', 'CLOSED'];
  const titles = [
    'Ransomware Attack Detected on File Server',
    'DDoS Attack Targeting Web Application',
    'Brute Force Login Attempts from Eastern Europe',
    'SQL Injection Attempt on API Gateway',
    'Suspicious Lateral Movement Detected',
    'Phishing Campaign Targeting Finance',
    'Unauthorized Privilege Escalation',
    'Malware C2 Communication Detected',
    'Data Exfiltration via DNS Tunneling',
    'Insider Threat - Unusual Data Access',
    'Credential Stuffing on Auth Service',
    'Cryptomining on Cloud Instance',
    'Suspicious PowerShell Execution',
    'Anomalous Network Traffic Spike',
    'Failed MFA Bypass Attempt',
  ];
  return titles.map((title, i) => ({
    id: `inc-${i + 1}`,
    title,
    description: `Automated detection by SentinelAI agent — ${title}`,
    severity: severities[i % severities.length],
    status: statuses[i % statuses.length],
    type: types[i % types.length],
    assignedAgent: 'AI Agent',
    timeline: [
      { timestamp: new Date(Date.now() - (i + 1) * 3600000).toISOString(), event: 'Incident detected', source: 'AI Agent', severity: severities[i % severities.length] },
      { timestamp: new Date(Date.now() - i * 3600000).toISOString(), event: 'Investigation initiated', source: 'Coordinator', severity: 'INFO' },
    ],
    affectedAssets: ['srv-web-01', 'srv-db-02'],
    relatedIOCs: [`192.168.1.${(i * 13 + 7) % 255}`],
    evidence: [],
    aiSummary: `AI-generated investigation summary for ${title}`,
    riskScore: 40 + Math.random() * 60,
    createdAt: new Date(Date.now() - (i + 1) * 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
  }));
}

export function getMockAlerts(): Alert[] {
  const types = ['INTRUSION', 'MALWARE', 'ANOMALY', 'POLICY_VIOLATION', 'VULNERABILITY'];
  const severities: Alert['severity'][] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'];
  const sources = ['WAZUH', 'SURICATA', 'ZEEK', 'YARA', 'ML_ENGINE', 'AI_AGENT'];
  return Array.from({ length: 30 }, (_, i) => ({
    id: `alert-${i + 1}`,
    title: `${types[i % types.length]} Detection — Rule ${1000 + i}`,
    description: 'Automated alert from security monitoring',
    type: types[i % types.length],
    severity: severities[i % severities.length],
    source: sources[i % sources.length],
    sourceIp: `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`,
    destinationIp: `10.0.0.${Math.floor(Math.random() * 254) + 1}`,
    sourcePort: Math.floor(Math.random() * 64511) + 1024,
    destinationPort: [80, 443, 22, 3389, 8080][i % 5],
    protocol: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS'][i % 5],
    acknowledged: i > 15,
    confidenceScore: 0.6 + Math.random() * 0.4,
    timestamp: new Date(Date.now() - Math.random() * 168 * 3600000).toISOString(),
  }));
}

export function getMockThreats(): ThreatIntel[] {
  return [
    { id: 't1', iocType: 'IP', iocValue: '185.220.101.34', source: 'ABUSEIPDB', riskScore: 95, threatType: 'C2', malwareFamily: 'Cobalt Strike', tags: ['apt', 'c2'], active: true, firstSeen: new Date(Date.now() - 30 * 86400000).toISOString(), lastSeen: new Date().toISOString() },
    { id: 't2', iocType: 'HASH', iocValue: 'a1b2c3d4e5f6789012345678abcdef01', source: 'VIRUSTOTAL', riskScore: 98, threatType: 'RANSOMWARE', malwareFamily: 'LockBit', tags: ['ransomware'], active: true, firstSeen: new Date(Date.now() - 7 * 86400000).toISOString(), lastSeen: new Date().toISOString() },
    { id: 't3', iocType: 'DOMAIN', iocValue: 'malware-c2.evil.com', source: 'ALIENVAULT', riskScore: 92, threatType: 'MALWARE', malwareFamily: 'Emotet', tags: ['malware', 'emotet'], active: true, firstSeen: new Date(Date.now() - 14 * 86400000).toISOString(), lastSeen: new Date().toISOString() },
    { id: 't4', iocType: 'IP', iocValue: '45.33.32.156', source: 'INTERNAL', riskScore: 78, threatType: 'BOTNET', tags: ['botnet', 'scan'], active: true, firstSeen: new Date(Date.now() - 5 * 86400000).toISOString(), lastSeen: new Date().toISOString() },
    { id: 't5', iocType: 'URL', iocValue: 'https://phishing-site.example.com/login', source: 'INTERNAL', riskScore: 88, threatType: 'PHISHING', tags: ['phishing'], active: true, firstSeen: new Date(Date.now() - 2 * 86400000).toISOString(), lastSeen: new Date().toISOString() },
    { id: 't6', iocType: 'IP', iocValue: '103.224.182.251', source: 'ABUSEIPDB', riskScore: 85, threatType: 'C2', malwareFamily: 'AsyncRAT', tags: ['rat', 'c2'], active: true, firstSeen: new Date(Date.now() - 10 * 86400000).toISOString(), lastSeen: new Date().toISOString() },
  ];
}

export function getMockVulnerabilities(): Vulnerability[] {
  return [
    { id: 'v1', cveId: 'CVE-2024-21762', title: 'Fortinet FortiOS RCE', description: 'Critical RCE in SSL VPN', severity: 'CRITICAL', cvssScore: 9.8, status: 'OPEN', affectedAssets: ['fw-edge-01'], patchAvailable: 'Yes', publishedDate: new Date(Date.now() - 90 * 86400000).toISOString(), detectedAt: new Date(Date.now() - 5 * 86400000).toISOString() },
    { id: 'v2', cveId: 'CVE-2024-3400', title: 'PAN-OS Command Injection', description: 'Critical command injection in GlobalProtect', severity: 'CRITICAL', cvssScore: 10.0, status: 'IN_PROGRESS', affectedAssets: ['fw-pa-01'], patchAvailable: 'Yes', publishedDate: new Date(Date.now() - 60 * 86400000).toISOString(), detectedAt: new Date(Date.now() - 3 * 86400000).toISOString() },
    { id: 'v3', cveId: 'CVE-2024-1709', title: 'ScreenConnect Auth Bypass', description: 'Authentication bypass vulnerability', severity: 'HIGH', cvssScore: 8.4, status: 'PATCHED', affectedAssets: ['srv-remote-01'], patchAvailable: 'Yes', publishedDate: new Date(Date.now() - 120 * 86400000).toISOString(), detectedAt: new Date(Date.now() - 10 * 86400000).toISOString() },
    { id: 'v4', cveId: 'CVE-2024-27198', title: 'TeamCity Auth Bypass', description: 'Critical authentication bypass', severity: 'CRITICAL', cvssScore: 9.8, status: 'OPEN', affectedAssets: ['srv-ci-01'], patchAvailable: 'Yes', publishedDate: new Date(Date.now() - 45 * 86400000).toISOString(), detectedAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    { id: 'v5', cveId: 'CVE-2023-44487', title: 'HTTP/2 Rapid Reset', description: 'HTTP/2 protocol DDoS vulnerability', severity: 'HIGH', cvssScore: 7.5, status: 'MITIGATED', affectedAssets: ['lb-01', 'lb-02'], patchAvailable: 'Yes', publishedDate: new Date(Date.now() - 200 * 86400000).toISOString(), detectedAt: new Date(Date.now() - 15 * 86400000).toISOString() },
  ];
}

export async function fetchCopilotResponse(message: string): Promise<{ response: string; suggestedActions: string[] }> {
  try {
    const res = await fetch(`${AI_BASE}/api/v1/copilot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id: 'default' }),
    });
    if (res.ok) {
      const data = await res.json();
      return { response: data.response, suggestedActions: data.suggested_actions || [] };
    }
  } catch { /* fall through to demo */ }

  // Demo mode fallback
  const msg = message.toLowerCase();
  if (msg.includes('failed login') || msg.includes('brute force')) {
    return {
      response: `## 🔐 Failed Login Analysis — Last 24 Hours\n\n### Summary\nDetected **847 failed login attempts** across 12 unique accounts from **23 distinct source IPs**.\n\n### Key Findings\n- **Peak Activity**: 02:00-04:00 UTC\n- **Top Targeted**: admin@corp.com (234), root (189), svc-backup (156)\n- **Top Sources**:\n  - \`185.220.101.34\` — Known Tor exit node (95% abuse score)\n  - \`45.33.32.156\` — Previously flagged\n\n### MITRE ATT&CK\n- **T1110.001** — Brute Force: Password Guessing\n\n### Actions\n1. 🚫 Block source IPs\n2. 🔒 Force password reset\n3. 📊 Enable adaptive MFA\n4. 🔍 Check for successful attempts`,
      suggestedActions: ['Block IPs', 'View incidents', 'Generate report'],
    };
  }
  if (msg.includes('ip') && (msg.includes('analyze') || msg.includes('suspicious'))) {
    return {
      response: `## 🌐 IP Analysis: 185.220.101.34\n\n| Attribute | Value |\n|---|---|\n| **Risk Score** | 95/100 |\n| **ASN** | AS24940 — Hetzner |\n| **Country** | Germany |\n| **Tor Exit** | ✅ Yes |\n| **AbuseIPDB** | 1,247 reports |\n\n### Recommended Actions\n1. 🚫 Block at perimeter\n2. 🔍 Check successful connections\n3. 📊 Add to watchlist`,
      suggestedActions: ['Block IP', 'Check connections', 'Add to watchlist'],
    };
  }
  return {
    response: `## 🛡️ SentinelAI Analysis\n\nAnalyzed: *"${message}"*\n\n### Current Status\n- **Active Incidents**: 15 (3 Critical)\n- **Security Score**: 73/100\n- **Pending Alerts**: 20\n\n### Suggestions\n- "Show failed logins in last 24 hours"\n- "Analyze suspicious IP 185.220.101.34"\n- "Generate incident report"\n- "Check compliance status"`,
    suggestedActions: ['View incidents', 'Check alerts', 'Generate report'],
  };
}

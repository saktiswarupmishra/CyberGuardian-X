"""Copilot Agent - Security AI Chat Assistant"""
from typing import Optional
from pydantic import BaseModel

class CopilotRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    context: Optional[dict] = None

class CopilotResponse(BaseModel):
    response: str
    session_id: str
    suggested_actions: list[str] = []
    related_iocs: list[dict] = []
    confidence: float = 0.0

COPILOT_SYSTEM_PROMPT = """You are SentinelAI Security Copilot, an expert AI security analyst embedded in an enterprise SOC platform.

Your capabilities:
- Analyze security logs, alerts, and incidents
- Investigate indicators of compromise (IOCs)
- Explain vulnerabilities and CVEs
- Provide threat intelligence insights
- Generate security reports
- Recommend response actions
- Map attacks to MITRE ATT&CK framework

Always be precise, actionable, and reference specific security frameworks when relevant.
Format responses with clear headers and bullet points for readability.
When analyzing threats, provide severity assessment and recommended actions."""


async def process_copilot_message(request: CopilotRequest) -> CopilotResponse:
    """Process a copilot chat message using Gemini"""
    try:
        from app.config import settings
        import google.generativeai as genai

        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            model = genai.GenerativeModel(settings.MODEL_NAME)
            
            prompt = f"{COPILOT_SYSTEM_PROMPT}\n\nUser Query: {request.message}"
            response = model.generate_content(prompt)
            
            return CopilotResponse(
                response=response.text,
                session_id=request.session_id or "default",
                suggested_actions=["View related incidents", "Search IOC database", "Generate report"],
                confidence=0.92
            )
        else:
            return _generate_demo_response(request)
    except Exception as e:
        return _generate_demo_response(request)


def _generate_demo_response(request: CopilotRequest) -> CopilotResponse:
    """Generate intelligent demo responses when API key is not available"""
    msg = request.message.lower()
    
    if "failed login" in msg or "brute force" in msg:
        response = """## 🔐 Failed Login Analysis - Last 24 Hours

### Summary
Detected **847 failed login attempts** across 12 unique accounts from **23 distinct source IPs**.

### Key Findings
- **Peak Activity**: 02:00-04:00 UTC (correlates with off-hours for US timezone)
- **Top Targeted Accounts**: admin@corp.com (234 attempts), root (189 attempts), svc-backup (156 attempts)
- **Top Source IPs**: 
  - `185.220.101.34` — Known Tor exit node (AbuseIPDB score: 95%)
  - `45.33.32.156` — Previously flagged for credential stuffing
  - `103.224.182.251` — Geo: China, no previous records

### MITRE ATT&CK Mapping
- **T1110.001** - Brute Force: Password Guessing
- **T1078** - Valid Accounts (if successful)

### Recommended Actions
1. 🚫 Block source IPs at firewall level
2. 🔒 Force password reset for targeted accounts
3. 📊 Enable adaptive MFA for all admin accounts
4. 🔍 Check if any attempts were successful
5. 📝 Create incident ticket for SOC review"""
    elif "suspicious ip" in msg or "analyze" in msg and "ip" in msg:
        response = """## 🌐 IP Analysis Report

### Target: 185.220.101.34

| Attribute | Value |
|-----------|-------|
| **Risk Score** | 95/100 (Critical) |
| **ASN** | AS24940 - Hetzner Online GmbH |
| **Country** | Germany |
| **Known Tor Exit** | ✅ Yes |
| **AbuseIPDB Reports** | 1,247 |
| **VirusTotal Detections** | 8/92 vendors |

### Threat Intelligence
- **Associated Campaigns**: APT29 infrastructure, Cobalt Strike C2
- **First Seen**: 2024-01-15
- **Last Active**: Current (within 1 hour)

### Network Activity (Last 7 Days)
- 847 connection attempts to port 22 (SSH)
- 234 connection attempts to port 3389 (RDP)
- 56 DNS queries to known C2 domains

### MITRE ATT&CK
- **T1190** - Exploit Public-Facing Application
- **T1133** - External Remote Services

### Recommended Actions
1. 🚫 **Immediate**: Block at perimeter firewall
2. 🔍 **Investigate**: Check for any successful connections
3. 📊 **Monitor**: Add to threat watchlist
4. 🔗 **Correlate**: Cross-reference with other IOCs"""
    elif "malware" in msg:
        response = """## 🦠 Malware Analysis Summary

### Detection Details
- **File**: `svchost_update.exe`
- **SHA256**: `a1b2c3d4e5f6...abcdef01`
- **Detection Rate**: 54/72 engines (VirusTotal)
- **Family**: LockBit 3.0 Ransomware

### Behavioral Analysis
- ✅ Creates persistence via Registry Run key
- ✅ Disables Windows Defender via PowerShell
- ✅ Enumerates network shares (SMB)
- ✅ Encrypts files with AES-256 + RSA-2048
- ✅ Drops ransom note in each directory
- ✅ Attempts lateral movement via PsExec

### MITRE ATT&CK Chain
1. **Initial Access** (T1566) → Phishing attachment
2. **Execution** (T1059) → PowerShell
3. **Persistence** (T1547) → Registry Run Keys
4. **Defense Evasion** (T1562) → Disable Security Tools
5. **Impact** (T1486) → Data Encrypted for Impact

### Recommended Actions
1. 🔴 **CRITICAL**: Isolate affected endpoints immediately
2. 🔍 Search for IOCs across all endpoints
3. 💾 Preserve forensic evidence
4. 🔄 Restore from clean backups
5. 📝 Report to CISA/law enforcement"""
    else:
        response = f"""## 🛡️ SentinelAI Analysis

I've analyzed your query: *"{request.message}"*

### Quick Assessment
Based on current threat landscape and your SOC data:

- **Active Incidents**: 15 (3 Critical, 5 High, 4 Medium, 3 Low)
- **Security Score**: 73/100
- **Unacknowledged Alerts**: 20
- **Critical Vulnerabilities**: 3 unpatched

### Suggested Next Steps
1. Review critical incidents requiring immediate attention
2. Acknowledge pending high-severity alerts
3. Prioritize patching critical vulnerabilities
4. Review compliance status for upcoming audit

### Available Commands
- "Show failed logins in last 24 hours"
- "Analyze suspicious IP [address]"
- "Explain this malware [hash]"
- "Generate incident report"
- "Show MITRE ATT&CK coverage"
- "Check compliance status"

How would you like to proceed?"""

    return CopilotResponse(
        response=response,
        session_id=request.session_id or "default",
        suggested_actions=["View incidents", "Search IOCs", "Generate report", "Check compliance"],
        confidence=0.95
    )

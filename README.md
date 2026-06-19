# 🛡️CyberGuardian X
## AI-Powered Autonomous Security Operations Center

An enterprise-grade, production-ready SOC platform that leverages **Agentic AI**, **Large Language Models**, **RAG**, and **Multi-Agent Orchestration** to detect, investigate, analyze, and respond to cyber threats in real-time.

---

## 🏗️ Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React, TypeScript, Tailwind CSS v4, ShadCN UI | Premium SOC dashboard |
| **Backend** | Java 21, Spring Boot 3.5, Spring Security, JWT, WebSocket | REST/GraphQL API layer |
| **AI Service** | Python, FastAPI, LangGraph, Gemini 2.5 | Multi-agent AI orchestration |
| **Database** | MongoDB 7.0 | Document store for all SOC data |
| **Infrastructure** | Docker, Kubernetes, GitHub Actions | Container orchestration & CI/CD |

---

## 🤖 AI Multi-Agent System

| Agent | Responsibility |
|-------|---------------|
| **Security Coordinator** | Orchestrates all agents, assigns investigations, prioritizes incidents |
| **Log Analysis** | Analyze logs, detect anomalies, identify attack patterns |
| **Threat Intelligence** | IOC matching, threat feed correlation, malware intelligence |
| **Incident Investigation** | Root cause analysis, timeline creation, evidence collection |
| **Incident Response** | Block IPs, disable accounts, isolate devices, trigger playbooks |
| **Vulnerability Assessment** | Scan infrastructure, analyze CVEs, prioritize risks |
| **Compliance Monitor** | SOC2, ISO 27001, PCI DSS, GDPR compliance monitoring |
| **Digital Forensics** | Memory analysis, file analysis, attack reconstruction |
| **Security Reporter** | Executive, technical, and compliance report generation |
| **Security Copilot** | Natural language security queries and investigation guidance |

---

## 📋 Features

- **Real-Time Dashboard** — Live threat counters, attack heatmaps, security score, agent status
- **Incident Management** — Full lifecycle tracking with AI-generated investigation summaries
- **Threat Intelligence** — IOC correlation, MITRE ATT&CK mapping, threat actor profiling
- **Security Copilot** — AI chat assistant for threat hunting, log analysis, report generation
- **Analytics** — Predictive risk analysis, behavioral analytics, security KPIs
- **Vulnerability Management** — CVE tracking, CVSS scoring, patch recommendations
- **Compliance Monitoring** — SOC2, ISO 27001, PCI DSS, GDPR framework dashboards
- **Digital Forensics** — Evidence collection, attack timeline reconstruction
- **Automated Playbooks** — Orchestrated incident response workflows
- **Executive Reports** — AI-generated security summaries and compliance reports

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Java 21+
- Python 3.12+
- Docker & Docker Compose
- MongoDB 7.0+

### 1. Start MongoDB
```bash
docker-compose -f docker/docker-compose.dev.yml up -d
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Start Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 4. Start AI Service
```bash
cd ai-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Default Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sentinelai.com | Admin@2026 |
| Analyst | analyst@sentinelai.com | Analyst@2026 |
| CISO | ciso@sentinelai.com | Ciso@2026 |

---

## 📁 Project Structure

```
├── frontend/        # Next.js 16 + ShadCN UI + Tailwind v4
├── backend/         # Spring Boot 3.5 + Spring Security + JWT
├── ai-service/      # FastAPI + LangGraph + Gemini 2.5
├── docker/          # Docker Compose + MongoDB config
├── k8s/             # Kubernetes manifests
└── .github/         # CI/CD workflows
```

---

## 📄 License

MIT License

---

**Built with ❤️ by CyberGuardian X Team**

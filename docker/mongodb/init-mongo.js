db = db.getSiblingDB('sentinelai_soc');

// Create collections with schema validation
db.createCollection('users');
db.createCollection('incidents');
db.createCollection('alerts');
db.createCollection('threats');
db.createCollection('vulnerabilities');
db.createCollection('compliance_controls');
db.createCollection('playbooks');
db.createCollection('agent_tasks');
db.createCollection('audit_logs');
db.createCollection('reports');
db.createCollection('chat_sessions');
db.createCollection('security_events');

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.incidents.createIndex({ "severity": 1, "status": 1, "createdAt": -1 });
db.alerts.createIndex({ "severity": 1, "acknowledged": 1, "timestamp": -1 });
db.threats.createIndex({ "iocValue": 1, "iocType": 1 });
db.threats.createIndex({ "riskScore": -1 });
db.vulnerabilities.createIndex({ "cveId": 1 }, { unique: true });
db.vulnerabilities.createIndex({ "severity": 1, "status": 1 });
db.security_events.createIndex({ "timestamp": -1 });
db.security_events.createIndex({ "eventType": 1, "severity": 1 });
db.audit_logs.createIndex({ "timestamp": -1 });
db.agent_tasks.createIndex({ "agentType": 1, "status": 1 });

print('SentinelAI SOC database initialized successfully');

"""AI Service Routes - Agents"""
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AgentStatusResponse(BaseModel):
    name: str
    type: str
    status: str
    tasks_completed: int
    tasks_pending: int
    success_rate: float

@router.get("/status")
async def get_agent_statuses():
    """Get all agent statuses"""
    return [
        AgentStatusResponse(name="Security Coordinator", type="COORDINATOR", status="ONLINE", tasks_completed=1247, tasks_pending=3, success_rate=99.2),
        AgentStatusResponse(name="Log Analysis", type="LOG_ANALYSIS", status="ONLINE", tasks_completed=8934, tasks_pending=12, success_rate=97.8),
        AgentStatusResponse(name="Threat Intelligence", type="THREAT_INTEL", status="ONLINE", tasks_completed=3421, tasks_pending=5, success_rate=98.5),
        AgentStatusResponse(name="Incident Investigation", type="INVESTIGATION", status="BUSY", tasks_completed=892, tasks_pending=8, success_rate=96.3),
        AgentStatusResponse(name="Incident Response", type="RESPONSE", status="ONLINE", tasks_completed=456, tasks_pending=2, success_rate=99.1),
        AgentStatusResponse(name="Vulnerability Assessment", type="VULNERABILITY", status="ONLINE", tasks_completed=2134, tasks_pending=15, success_rate=97.2),
        AgentStatusResponse(name="Compliance Monitor", type="COMPLIANCE", status="ONLINE", tasks_completed=1876, tasks_pending=4, success_rate=98.9),
        AgentStatusResponse(name="Digital Forensics", type="FORENSICS", status="ONLINE", tasks_completed=324, tasks_pending=1, success_rate=99.5),
        AgentStatusResponse(name="Security Reporter", type="REPORTER", status="ONLINE", tasks_completed=567, tasks_pending=0, success_rate=100.0),
        AgentStatusResponse(name="Security Copilot", type="COPILOT", status="ONLINE", tasks_completed=4523, tasks_pending=0, success_rate=98.7),
    ]

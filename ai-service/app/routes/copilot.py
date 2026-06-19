"""AI Service Routes - Copilot"""
from fastapi import APIRouter
from app.agents.copilot import CopilotRequest, CopilotResponse, process_copilot_message

router = APIRouter()

@router.post("/chat", response_model=CopilotResponse)
async def chat(request: CopilotRequest):
    """Security Copilot chat endpoint"""
    return await process_copilot_message(request)

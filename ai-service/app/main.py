"""SentinelAI SOC - AI Service Main Application"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.routes import copilot, agents, analysis

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler"""
    print("🛡️ SentinelAI SOC AI Service starting...")
    yield
    print("🛡️ SentinelAI SOC AI Service shutting down...")

app = FastAPI(
    title="SentinelAI SOC - AI Service",
    description="AI-Powered Autonomous Security Operations Center",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(copilot.router, prefix="/api/v1/copilot", tags=["Copilot"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["Agents"])
app.include_router(analysis.router, prefix="/api/v1/analyze", tags=["Analysis"])

@app.get("/health")
async def health():
    return {"status": "healthy", "service": "SentinelAI SOC AI Service"}

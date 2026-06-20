"""Configuration for AI Service"""
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017/sentinelai_soc")
    MODEL_NAME: str = "gemini-2.5-flash"
    MODEL_PRO: str = "gemini-2.5-pro"
    EMBEDDING_MODEL: str = "all-MiniLM-L6-v2"

    class Config:
        env_file = ".env"

settings = Settings()

import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "AI Academic Recovery & Course Progress Agent API"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    PORT: int = int(os.getenv("PORT", 8000))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./academic_recovery.db"
    )

    # Vector DB & AI
    CHROMA_DB_URL: str = os.getenv("CHROMA_DB_URL", "http://localhost:8000")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "mock_openai_api_key")

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

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
    CHROMA_PATH: str = os.getenv("CHROMA_PATH", "")
    CHROMA_DB_URL: str = os.getenv("CHROMA_DB_URL", "http://localhost:8000")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "mock_openai_api_key")

    # Security & Authentication
    JWT_SECRET: str = os.getenv("JWT_SECRET", "supersecretjwtkey_change_in_production")

    # SMTP Credentials
    SMTP_SERVER: str = os.getenv("SMTP_SERVER", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 587))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")

    # External Integration Microservices
    ATTENDANCE_SYSTEM_URL: str = os.getenv("ATTENDANCE_SYSTEM_URL", "http://localhost:9001")
    LESSON_PLAN_SYSTEM_URL: str = os.getenv("LESSON_PLAN_SYSTEM_URL", "http://localhost:9002")

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

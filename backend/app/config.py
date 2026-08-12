import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/taskmanager"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://localhost:80,http://127.0.0.1:5173"
    ENVIRONMENT: str = "development"

    @property
    def cors_origins_list(self) -> List[str]:
        if isinstance(self.CORS_ORIGINS, str):
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]
        return ["*"]

    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()

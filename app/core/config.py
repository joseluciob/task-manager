import os

from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str

    model_config = ConfigDict(env_file=os.getenv("ENV_FILE", ".env"))


settings = Settings()

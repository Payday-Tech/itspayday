from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # reCAPTCHA v2 secret key
    recaptcha_secret_key: str = ""

    # CORS allowed origins
    cors_origins: str = "http://localhost:3000,http://localhost:3001"

    # Environment
    environment: str = "development"

    # Google Sheets integration
    google_credentials_json: str = ""  # Service account JSON as string
    google_spreadsheet_id: str = ""  # ID of the Google Spreadsheet

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import cors_origins_list, get_settings
from app.forms_router import compat_router, forms_router

settings = get_settings()

SAFE_CORS_ORIGINS = {
    "https://itspayday.in",
    "https://www.itspayday.in",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
}
SAFE_CORS_REGEX = (
    r"^https://([a-zA-Z0-9-]+\.)*itspayday\.in$|"
    r"^https://payday-api-[a-zA-Z0-9-]+\.onrender\.com$|"
    r"^http://localhost(:\d+)?$|"
    r"^http://127\.0\.0\.1(:\d+)?$"
)

app = FastAPI(
    title="Payday API",
    description="Backend API for Payday website forms",
    version="1.0.0",
)

origins = sorted(set(cors_origins_list(settings.cors_origins)).union(SAFE_CORS_ORIGINS))
active_origin_regex = settings.cors_origin_regex or SAFE_CORS_REGEX

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=active_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "environment": settings.environment}


@app.get("/debug/cors")
async def cors_debug():
    """Return active CORS configuration for deployment debugging."""
    return {
        "origins": origins,
        "origin_regex": active_origin_regex,
    }


app.include_router(forms_router)
app.include_router(compat_router)

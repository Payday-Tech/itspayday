import logging
from typing import Any, Optional

from app.config import get_settings

logger = logging.getLogger(__name__)

_supabase_client: Optional[Any] = None


def get_supabase_client() -> Optional[Any]:
    """Initialize and cache Supabase client from environment settings."""
    global _supabase_client

    if _supabase_client is not None:
        return _supabase_client

    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_service_key:
        logger.warning("Supabase not configured. Missing SUPABASE_URL or SUPABASE_SERVICE_KEY")
        return None

    try:
        from supabase import create_client  # Lazy import so app still boots if dependency is not installed yet.
    except Exception:
        logger.exception("Supabase package is not available")
        return None

    try:
        _supabase_client = create_client(settings.supabase_url, settings.supabase_service_key)
        return _supabase_client
    except Exception:
        logger.exception("Failed to initialize Supabase client")
        return None

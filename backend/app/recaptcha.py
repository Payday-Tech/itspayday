import httpx
from app.config import get_settings

RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"


async def verify_recaptcha(token: str) -> bool:
    """
    Verify reCAPTCHA v2 token with Google's API.

    Args:
        token: The reCAPTCHA response token from the client

    Returns:
        bool: True if verification succeeded, False otherwise
    """
    settings = get_settings()

    if not settings.recaptcha_secret_key:
        # In development without key, skip verification
        if settings.environment == "development":
            return True
        return False

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                RECAPTCHA_VERIFY_URL,
                data={
                    "secret": settings.recaptcha_secret_key,
                    "response": token,
                },
            )
            result = response.json()
            return result.get("success", False)
    except Exception:
        return False

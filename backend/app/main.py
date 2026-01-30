from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.schemas import (
    GetStartedForm,
    ContactForm,
    LenderPartnershipForm,
    FormResponse,
)
from app.recaptcha import verify_recaptcha

settings = get_settings()

app = FastAPI(
    title="Payday API",
    description="Backend API for Payday website forms",
    version="1.0.0",
)

# Configure CORS
origins = [origin.strip() for origin in settings.cors_origins.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "environment": settings.environment}


@app.post("/api/forms/get-started", response_model=FormResponse)
async def submit_get_started(form: GetStartedForm):
    """
    Handle Get Started form submission from the modal.
    """
    # Verify reCAPTCHA
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="reCAPTCHA verification failed",
        )

    # TODO: Process form data (e.g., save to database, send notification)
    # For now, just log and return success
    print(f"Get Started form submitted: {form.first_name} {form.last_name}, {form.occupation}")

    return FormResponse(
        success=True,
        message="Thank you! We'll be in touch soon on WhatsApp.",
    )


@app.post("/api/forms/contact", response_model=FormResponse)
async def submit_contact(form: ContactForm):
    """
    Handle Contact form submission.
    """
    # Verify reCAPTCHA
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="reCAPTCHA verification failed",
        )

    # TODO: Process form data (e.g., save to database, send email)
    print(f"Contact form submitted: {form.name}, {form.email}, Topic: {form.topic}")

    return FormResponse(
        success=True,
        message="Thank you for your message! We'll respond within 1 business day.",
    )


@app.post("/api/forms/lender-partnership", response_model=FormResponse)
async def submit_lender_partnership(form: LenderPartnershipForm):
    """
    Handle Lender Partnership form submission.
    """
    # Verify reCAPTCHA
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="reCAPTCHA verification failed",
        )

    # TODO: Process form data (e.g., save to database, notify sales team)
    print(f"Lender partnership form submitted: {form.name} from {form.company}")

    return FormResponse(
        success=True,
        message="Thank you for your interest! Our partnerships team will be in touch soon.",
    )

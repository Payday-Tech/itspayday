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
from app.sheets import save_get_started_form, save_contact_form, save_lender_partnership_form

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

    # Save to Google Sheets
    save_get_started_form(
        first_name=form.first_name,
        last_name=form.last_name,
        occupation=form.occupation,
    )

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

    # Save to Google Sheets
    save_contact_form(
        name=form.name,
        email=form.email,
        topic=form.topic,
        message=form.message,
    )

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

    # Save to Google Sheets
    save_lender_partnership_form(
        name=form.name,
        company=form.company,
        email=form.email,
        phone=form.phone,
        role=form.role,
        city=form.city,
        notes=form.notes,
    )

    print(f"Lender partnership form submitted: {form.name} from {form.company}")

    return FormResponse(
        success=True,
        message="Thank you for your interest! Our partnerships team will be in touch soon.",
    )

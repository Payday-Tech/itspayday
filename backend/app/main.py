from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.config import cors_origins_list, get_settings
from app.schemas import (
    GetStartedForm,
    ContactForm,
    LenderPartnershipForm,
    EligibilitySubmission,
    FormResponse,
)
from app.recaptcha import verify_recaptcha
from app.notifications import send_success_alert
from app.sheets import (
    save_get_started_form,
    save_contact_form,
    save_lender_partnership_form,
    save_eligibility_submission,
)

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


@app.post("/api/forms/get-started", response_model=FormResponse)
async def submit_get_started(form: GetStartedForm):
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="reCAPTCHA verification failed")

    save_get_started_form(first_name=form.first_name, last_name=form.last_name, occupation=form.occupation)

    return FormResponse(success=True, message="Thank you! We'll be in touch soon on WhatsApp.")


@app.post("/api/forms/contact", response_model=FormResponse)
async def submit_contact(form: ContactForm):
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="reCAPTCHA verification failed")

    save_contact_form(name=form.name, email=form.email, topic=form.topic, message=form.message)

    return FormResponse(success=True, message="Thank you for your message! We'll respond within 1 business day.")


@app.post("/api/forms/lender-partnership", response_model=FormResponse)
async def submit_lender_partnership(form: LenderPartnershipForm):
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="reCAPTCHA verification failed")

    save_lender_partnership_form(
        name=form.name,
        company=form.company,
        email=form.email,
        phone=form.phone,
        role=form.role,
        city=form.city,
        notes=form.notes,
    )

    return FormResponse(success=True, message="Thank you for your interest! Our partnerships team will be in touch soon.")


@app.post("/api/forms/check-eligibility", response_model=FormResponse)
async def submit_check_eligibility(form: EligibilitySubmission):
    if not form.consentAccepted or not form.privacyAccepted:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Consent is required")

    save_eligibility_submission(form)

    send_success_alert(
        first_name=form.firstName,
        mobile=form.phone1,
        application_id=form.applicationId,
        has_pan=bool(form.pan),
    )

    return FormResponse(success=True, message="Your details have been received.")

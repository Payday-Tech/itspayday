import logging

from fastapi import APIRouter, HTTPException, status

from app.notifications import send_success_alert
from app.recaptcha import verify_recaptcha
from app.schemas import (
    ContactForm,
    EligibilitySubmission,
    FormResponse,
    GetStartedForm,
    LenderPartnershipForm,
)
from app.sheets import (
    save_contact_form,
    save_eligibility_submission,
    save_get_started_form,
    save_lender_partnership_form,
)

forms_router = APIRouter(prefix="/api/forms", tags=["forms"])
logger = logging.getLogger(__name__)


@forms_router.post("/get-started", response_model=FormResponse)
async def submit_get_started(form: GetStartedForm):
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="reCAPTCHA verification failed")

    save_get_started_form(first_name=form.first_name, last_name=form.last_name, occupation=form.occupation)
    return FormResponse(success=True, message="Thank you! We'll be in touch soon on WhatsApp.")


@forms_router.post("/contact", response_model=FormResponse)
async def submit_contact(form: ContactForm):
    if not await verify_recaptcha(form.recaptcha_token):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="reCAPTCHA verification failed")

    save_contact_form(name=form.name, email=form.email, topic=form.topic, message=form.message)
    return FormResponse(success=True, message="Thank you for your message! We'll respond within 1 business day.")


@forms_router.post("/lender-partnership", response_model=FormResponse)
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


@forms_router.post("/check-eligibility", response_model=FormResponse)
async def submit_check_eligibility(form: EligibilitySubmission):
    logger.info(
        "eligibility_submission_received application_id=%s source=%s has_pan=%s",
        form.applicationId,
        form.source,
        bool(form.pan),
    )

    if not form.consentAccepted or not form.privacyAccepted:
        logger.warning("eligibility_submission_rejected application_id=%s reason=missing_consent", form.applicationId)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Consent is required")

    try:
        persisted = save_eligibility_submission(form)
        if not persisted:
            logger.error("eligibility_submission_failed application_id=%s reason=storage_insert_failed", form.applicationId)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to save submission")

        send_success_alert(
            first_name=form.firstName,
            mobile=form.phone1,
            application_id=form.applicationId,
            has_pan=bool(form.pan),
        )
    except HTTPException:
        raise
    except Exception:
        logger.exception("eligibility_submission_failed application_id=%s", form.applicationId)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to submit right now")

    logger.info("eligibility_submission_saved application_id=%s", form.applicationId)
    return FormResponse(success=True, message="Your details have been received.")

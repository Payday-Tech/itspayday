import logging
import smtplib
from email.message import EmailMessage

from app.config import get_settings

logger = logging.getLogger(__name__)


def send_success_alert(first_name: str, mobile: str, application_id: str, has_pan: bool) -> bool:
    settings = get_settings()

    if not settings.smtp_host or not settings.smtp_sender:
        logger.warning("SMTP not configured. Skipping success alert email.")
        return False

    pan_label = 'PAN present' if has_pan else 'No PAN, upload only'
    subject = f"[PayDay Eligibility] New successful submission - {pan_label}"
    body = (
        "A new check-eligibility form has been submitted successfully.\n\n"
        f"First name: {first_name}\n"
        f"Mobile: {mobile}\n"
        f"Application ID: {application_id}\n"
        f"Filter group: {pan_label}\n"
    )

    message = EmailMessage()
    message['Subject'] = subject
    message['From'] = settings.smtp_sender
    message['To'] = settings.alert_email_to
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
            server.starttls()
            if settings.smtp_username and settings.smtp_password:
                server.login(settings.smtp_username, settings.smtp_password)
            server.send_message(message)
        return True
    except Exception as exc:
        logger.error(f"Failed to send alert email: {exc}")
        return False

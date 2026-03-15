import json
import logging
import traceback
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
from typing import Optional

from app.config import get_settings
from app.schemas import EligibilitySubmission

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Google Sheets API scopes
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

_client: Optional[gspread.Client] = None


def get_sheets_client() -> Optional[gspread.Client]:
    """Get or create a Google Sheets client."""
    global _client

    if _client is not None:
        logger.info("Using cached Google Sheets client")
        return _client

    settings = get_settings()

    logger.info(f"GOOGLE_CREDENTIALS_JSON set: {bool(settings.google_credentials_json)}")
    logger.info(f"GOOGLE_CREDENTIALS_JSON length: {len(settings.google_credentials_json) if settings.google_credentials_json else 0}")

    if not settings.google_credentials_json:
        logger.warning("GOOGLE_CREDENTIALS_JSON not set, Google Sheets integration disabled")
        return None

    try:
        logger.info("Parsing Google credentials JSON...")
        creds_dict = json.loads(settings.google_credentials_json)
        logger.info(f"Credentials parsed successfully. Project ID: {creds_dict.get('project_id', 'N/A')}")
        logger.info(f"Service account email: {creds_dict.get('client_email', 'N/A')}")

        credentials = Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
        logger.info("Credentials object created successfully")

        _client = gspread.authorize(credentials)
        logger.info("Google Sheets client authorized successfully")
        return _client
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse GOOGLE_CREDENTIALS_JSON: {e}")
        logger.error(f"First 100 chars of credentials: {settings.google_credentials_json[:100] if settings.google_credentials_json else 'empty'}")
        return None
    except Exception as e:
        logger.error(f"Error initializing Google Sheets client: {e}")
        logger.error(traceback.format_exc())
        return None


def append_to_sheet(spreadsheet_id: str, sheet_name: str, row_data: list) -> bool:
    logger.info(f"append_to_sheet called: spreadsheet_id={spreadsheet_id}, sheet_name={sheet_name}")
    logger.info(f"Row data: {row_data}")

    client = get_sheets_client()

    if client is None:
        logger.error("Google Sheets client not available, skipping sheet write")
        return False

    try:
        spreadsheet = client.open_by_key(spreadsheet_id)

        try:
            worksheet = spreadsheet.worksheet(sheet_name)
        except gspread.WorksheetNotFound:
            worksheet = spreadsheet.add_worksheet(title=sheet_name, rows=1000, cols=30)
            headers = get_headers_for_sheet(sheet_name)
            if headers:
                worksheet.append_row(headers)

        timestamp = datetime.utcnow().isoformat()
        row_with_timestamp = [timestamp] + row_data

        worksheet.append_row(row_with_timestamp)
        logger.info(f"Successfully appended row to {sheet_name}")
        return True

    except Exception as e:
        logger.error(f"Error appending to Google Sheet: {e}")
        logger.error(traceback.format_exc())
        return False


def get_headers_for_sheet(sheet_name: str) -> list:
    headers_map = {
        "Get Started": ["timestamp", "first_name", "last_name", "occupation"],
        "Contact": ["timestamp", "name", "email", "topic", "message"],
        "Lender Partnership": ["timestamp", "name", "company", "email", "phone", "role", "city", "notes"],
        "Eligibility Submissions": [
            "submitted_at", "application_id", "first_name", "last_name", "mobile", "dob", "pan", "address", "city", "state",
            "pincode", "phone2", "consent", "consent_timestamp", "privacy", "source", "voter_upload_ref", "driving_licence_upload_ref", "passport_upload_ref",
        ],
        "Eligibility Ops": ["timestamp", "application_id", "review_status", "bureau_status", "remarks", "partner_shared", "shared_at"],
    }
    return headers_map.get(sheet_name, [])


def save_get_started_form(first_name: str, last_name: str, occupation: str) -> bool:
    settings = get_settings()
    if not settings.google_spreadsheet_id:
        return False

    return append_to_sheet(settings.google_spreadsheet_id, "Get Started", [first_name, last_name, occupation])


def save_contact_form(name: str, email: str, topic: str, message: str) -> bool:
    settings = get_settings()
    if not settings.google_spreadsheet_id:
        return False

    return append_to_sheet(settings.google_spreadsheet_id, "Contact", [name, email, topic, message])


def save_lender_partnership_form(name: str, company: str, email: str, phone: str, role: str, city: str, notes: str) -> bool:
    settings = get_settings()
    if not settings.google_spreadsheet_id:
        return False

    return append_to_sheet(settings.google_spreadsheet_id, "Lender Partnership", [name, company, email, phone, role, city, notes or ""])


def save_eligibility_to_sheet(form: EligibilitySubmission) -> bool:
    """Append eligibility submission to Google Sheets."""
    settings = get_settings()
    if not settings.google_spreadsheet_id:
        return False

    voter_ref = form.voterIdUpload.storageRef if form.voterIdUpload else ""
    dl_ref = form.drivingLicenceUpload.storageRef if form.drivingLicenceUpload else ""
    passport_ref = form.passportUpload.storageRef if form.passportUpload else ""

    row = [
        form.applicationId,
        form.firstName,
        form.lastName,
        form.phone1,
        form.dob,
        form.pan,
        form.address1,
        form.city1,
        form.state1,
        form.pincode1,
        form.phone2,
        str(form.consentAccepted),
        form.consentTimestamp,
        str(form.privacyAccepted),
        form.source,
        voter_ref,
        dl_ref,
        passport_ref,
    ]

    return append_to_sheet(settings.google_spreadsheet_id, "Eligibility Submissions", row)



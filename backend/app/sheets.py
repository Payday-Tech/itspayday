import json
import logging
import traceback
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
from typing import Optional

from app.config import get_settings

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
        # Parse credentials from JSON string
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
    """
    Append a row to a Google Sheet.

    Args:
        spreadsheet_id: The ID of the Google Spreadsheet
        sheet_name: The name of the sheet/tab to append to
        row_data: List of values to append as a row

    Returns:
        True if successful, False otherwise
    """
    logger.info(f"append_to_sheet called: spreadsheet_id={spreadsheet_id}, sheet_name={sheet_name}")
    logger.info(f"Row data: {row_data}")

    client = get_sheets_client()

    if client is None:
        logger.error("Google Sheets client not available, skipping sheet write")
        return False

    try:
        logger.info(f"Opening spreadsheet by key: {spreadsheet_id}")
        spreadsheet = client.open_by_key(spreadsheet_id)
        logger.info(f"Spreadsheet opened successfully: {spreadsheet.title}")

        # Try to get the worksheet, create if it doesn't exist
        try:
            logger.info(f"Looking for worksheet: {sheet_name}")
            worksheet = spreadsheet.worksheet(sheet_name)
            logger.info(f"Worksheet found: {sheet_name}")
        except gspread.WorksheetNotFound:
            logger.info(f"Worksheet not found, creating: {sheet_name}")
            worksheet = spreadsheet.add_worksheet(title=sheet_name, rows=1000, cols=20)
            # Add headers based on the sheet name
            headers = get_headers_for_sheet(sheet_name)
            if headers:
                logger.info(f"Adding headers: {headers}")
                worksheet.append_row(headers)

        # Add timestamp to the beginning of the row
        timestamp = datetime.utcnow().isoformat()
        row_with_timestamp = [timestamp] + row_data

        logger.info(f"Appending row: {row_with_timestamp}")
        worksheet.append_row(row_with_timestamp)
        logger.info(f"Successfully appended row to {sheet_name}")
        return True

    except gspread.exceptions.APIError as e:
        logger.error(f"Google Sheets API Error: {e}")
        logger.error(f"API Error details: {e.response.text if hasattr(e, 'response') else 'N/A'}")
        logger.error(traceback.format_exc())
        return False
    except Exception as e:
        logger.error(f"Error appending to Google Sheet: {e}")
        logger.error(traceback.format_exc())
        return False


def get_headers_for_sheet(sheet_name: str) -> list:
    """Return appropriate headers for each form type."""
    headers_map = {
        "Get Started": ["Timestamp", "First Name", "Last Name", "Occupation"],
        "Contact": ["Timestamp", "Name", "Email", "Topic", "Message"],
        "Lender Partnership": ["Timestamp", "Name", "Company", "Email", "Phone", "Role", "City", "Notes"],
    }
    return headers_map.get(sheet_name, [])


# Helper functions for each form type
def save_get_started_form(first_name: str, last_name: str, occupation: str) -> bool:
    """Save Get Started form submission to Google Sheet."""
    logger.info(f"save_get_started_form called: {first_name} {last_name}, {occupation}")
    settings = get_settings()

    logger.info(f"GOOGLE_SPREADSHEET_ID set: {bool(settings.google_spreadsheet_id)}")
    if not settings.google_spreadsheet_id:
        logger.warning("GOOGLE_SPREADSHEET_ID not set")
        return False

    result = append_to_sheet(
        settings.google_spreadsheet_id,
        "Get Started",
        [first_name, last_name, occupation]
    )
    logger.info(f"save_get_started_form result: {result}")
    return result


def save_contact_form(name: str, email: str, topic: str, message: str) -> bool:
    """Save Contact form submission to Google Sheet."""
    logger.info(f"save_contact_form called: {name}, {email}, {topic}")
    settings = get_settings()

    logger.info(f"GOOGLE_SPREADSHEET_ID set: {bool(settings.google_spreadsheet_id)}")
    if not settings.google_spreadsheet_id:
        logger.warning("GOOGLE_SPREADSHEET_ID not set")
        return False

    result = append_to_sheet(
        settings.google_spreadsheet_id,
        "Contact",
        [name, email, topic, message]
    )
    logger.info(f"save_contact_form result: {result}")
    return result


def save_lender_partnership_form(
    name: str, company: str, email: str, phone: str, role: str, city: str, notes: str
) -> bool:
    """Save Lender Partnership form submission to Google Sheet."""
    logger.info(f"save_lender_partnership_form called: {name} from {company}")
    settings = get_settings()

    logger.info(f"GOOGLE_SPREADSHEET_ID set: {bool(settings.google_spreadsheet_id)}")
    if not settings.google_spreadsheet_id:
        logger.warning("GOOGLE_SPREADSHEET_ID not set")
        return False

    result = append_to_sheet(
        settings.google_spreadsheet_id,
        "Lender Partnership",
        [name, company, email, phone, role, city, notes or ""]
    )
    logger.info(f"save_lender_partnership_form result: {result}")
    return result

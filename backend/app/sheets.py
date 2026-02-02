import json
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
from typing import Optional

from app.config import get_settings

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
        return _client

    settings = get_settings()

    if not settings.google_credentials_json:
        print("Warning: GOOGLE_CREDENTIALS_JSON not set, Google Sheets integration disabled")
        return None

    try:
        # Parse credentials from JSON string
        creds_dict = json.loads(settings.google_credentials_json)
        credentials = Credentials.from_service_account_info(creds_dict, scopes=SCOPES)
        _client = gspread.authorize(credentials)
        return _client
    except Exception as e:
        print(f"Error initializing Google Sheets client: {e}")
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
    client = get_sheets_client()

    if client is None:
        print("Google Sheets client not available, skipping sheet write")
        return False

    try:
        spreadsheet = client.open_by_key(spreadsheet_id)

        # Try to get the worksheet, create if it doesn't exist
        try:
            worksheet = spreadsheet.worksheet(sheet_name)
        except gspread.WorksheetNotFound:
            worksheet = spreadsheet.add_worksheet(title=sheet_name, rows=1000, cols=20)
            # Add headers based on the sheet name
            headers = get_headers_for_sheet(sheet_name)
            if headers:
                worksheet.append_row(headers)

        # Add timestamp to the beginning of the row
        timestamp = datetime.utcnow().isoformat()
        row_with_timestamp = [timestamp] + row_data

        worksheet.append_row(row_with_timestamp)
        print(f"Successfully appended row to {sheet_name}")
        return True

    except Exception as e:
        print(f"Error appending to Google Sheet: {e}")
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
    settings = get_settings()
    if not settings.google_spreadsheet_id:
        print("Warning: GOOGLE_SPREADSHEET_ID not set")
        return False

    return append_to_sheet(
        settings.google_spreadsheet_id,
        "Get Started",
        [first_name, last_name, occupation]
    )


def save_contact_form(name: str, email: str, topic: str, message: str) -> bool:
    """Save Contact form submission to Google Sheet."""
    settings = get_settings()
    if not settings.google_spreadsheet_id:
        print("Warning: GOOGLE_SPREADSHEET_ID not set")
        return False

    return append_to_sheet(
        settings.google_spreadsheet_id,
        "Contact",
        [name, email, topic, message]
    )


def save_lender_partnership_form(
    name: str, company: str, email: str, phone: str, role: str, city: str, notes: str
) -> bool:
    """Save Lender Partnership form submission to Google Sheet."""
    settings = get_settings()
    if not settings.google_spreadsheet_id:
        print("Warning: GOOGLE_SPREADSHEET_ID not set")
        return False

    return append_to_sheet(
        settings.google_spreadsheet_id,
        "Lender Partnership",
        [name, company, email, phone, role, city, notes or ""]
    )
